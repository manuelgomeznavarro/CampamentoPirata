<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use App\Models\Tutor;
use App\Models\User;
use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class TutorController extends Controller
{
    public function index()
    {
        $tutors = Tutor::all();
        return response()->json($tutors, 200);
    }

    public function store(Request $request)
    {
        try {
            $existingUser = User::where('email', $request->email)->first();

            if ($existingUser) {
                return response()->json([
                    'message' => 'Este email ya esta siendo usado',
                    'error' => 'Duplicate email'
                ], 422);
            }

            DB::beginTransaction();

            // Create the tutor
            $tutor = Tutor::create([
                'name' => $request->name,
                'lastname' => $request->lastname,
                'dni' => $request->dni,
                'phone' => $request->phone,
                'phone2' => $request->phone2,
                'city' => $request->city,
                'postal_code' => $request->postal_code,
            ]);

            // Create the associated user
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'tutor',
                'role_id' => $tutor->id
            ]);

            DB::commit();

            // return response()->json([
            //     'message' => 'Tutor creado correctamente',
            //     'tutor' => $tutor
            // ], 201);

            $tutors = Tutor::all();
            return response()->json($tutors, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating tutor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($IdTutors)
    {
        $tutors = Tutor::findOrFail($IdTutors);
        $user = User::where('role', 'tutor')->where('role_id', $IdTutors)->first();
        $tutors->email = $user->email;
        return response()->json($tutors, 200);
    }

    public function update(Request $request, $IdTutors)
    {
        Log::info('Received request data:', $request->all()); // Log input
        Log::info('Files:', $request->file()); // Log uploaded files
        // Log::info('----:', $request); // Log uploaded files

        try {
            // Validate the request
            $request->validate([
                'image' => 'required|image|max:5120', // 5MB max
                'json_data' => 'required|json'
            ]);
            
            // Parse the JSON data
            $jsonData = json_decode($request->json_data, true);
            
            // Begin transaction for data integrity
            DB::beginTransaction();
            
            // First, find the tutor
            $tutor = Tutor::findOrFail($IdTutors);
            
            // Then find the associated user
            $user = User::where('role', 'tutor')
                        ->where('role_id', $IdTutors)
                        ->first();
            
            if (!$user) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'User not found for this tutor'
                ], 404);
            }
            
            // Process image upload
            $file = $request->file('image');
            $originalName = $file->getClientOriginalName();
            $filename = Str::uuid() . '_' . $originalName;
            $path = 'user_images/' . $user->id . '/' . $filename;
            
            // Upload to DigitalOcean Spaces
            $uploaded = Storage::disk('s3')->put($path, file_get_contents($file), 'public');
            
            if (!$uploaded) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload image'
                ], 500);
            }
            
            // Generate the public URL
            $bucket = env('DO_SPACES_BUCKET');
            $region = env('DO_SPACES_REGION');
            $url = "https://{$bucket}.{$region}.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/{$path}";
            
            // Update the user's url_pic
            $user->url_pic = $url;
            $user->save();
            
            // Update the tutor's data from JSON data
            $tutor->update($jsonData);
            
            // If everything succeeded, commit the transaction
            DB::commit();
            
            // Include the image URL in the response
            $response = $tutor->toArray();
            $response['url_pic'] = $url;
            
            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error updating tutor',
                'error' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'error_code' => $e->getCode(),
                'error_code' => $e->getTrace(),
            ], 500);
        }
    }

    public function destroy($IdTutors)
    {
        $tutors = Tutor::findOrFail($IdTutors);
        $tutors->delete();
        return response()->json(['message' => 'Tutor eliminado correctamente'], 200);
    }

    // public function getChildrenFromTutor($IdTutors)
    // {
    //     $tutor = Tutor::findOrFail($IdTutors);
    //     $childrenFromInscription = $tutor->inscriptions->map(function ($inscription) {
    //         return $inscription->child_id;
    //     });

    //     return response()->json($childrenFromInscription, 200);
    // }

    public function children_info($tutor_id)
    {
        $inscriptions = Inscription::where('tutor_id', $tutor_id)->get();
        if (!$inscriptions) {
            return response()->json([
                'success' => false,
                'message' => 'inscription not found'
            ], 401);
        }

        // Obtiene todos los niños asociados a las inscripciones
        $children = $inscriptions->map(function ($inscription) {
            return Child::find($inscription->child_id);
        });

        // $children = Child::where('id', $inscription->child_id)->get();

        return response()->json([
            'success' => true,
            'children' => $children
        ], 200);
    }
}