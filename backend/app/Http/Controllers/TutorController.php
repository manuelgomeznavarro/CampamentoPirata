<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        return response()->json($tutors, 200);
    }
    
    public function update(Request $request, $IdTutors)
    {
        // Validate the request
        $request->validate([
            'image' => 'required|image|max:10240', // 10MB max
            'json_data' => 'required|json'
        ]);
        
        // Parse the JSON data
        $jsonData = json_decode($request->json_data, true);
        
        // Find the user associated with the tutor
        $user = User::where('role', 'tutor')
                    ->where('role_id', $IdTutors)
                    ->first();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found for this tutor'
            ], 404);
        }
        
        // Get the user's ID for image path
        $userId = $user->id;
        
        // Get the file
        $file = $request->file('image');
        $originalName = $file->getClientOriginalName();
        
        // Generate a unique filename
        $filename = Str::uuid() . '_' . $originalName;
        
        // Define the path in your spaces bucket
        $path = 'user_images/' . $userId . '/' . $filename;
        
        // Upload to DigitalOcean Spaces
        $uploaded = Storage::disk('s3')->put($path, file_get_contents($file), 'public');
        
        if (!$uploaded) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image'
            ], 500);
        }
        
        // Generate the public URL
        // $url = Storage::disk('s3');
        // // $url->url($path);
        // MANUALLY CONSTRUCT THE URL
        $bucket = env('DO_SPACES_BUCKET');
        $region = env('DO_SPACES_REGION');
        $url = "https://{$bucket}.{$region}.digitaloceanspaces.com/{$path}";
        
        // Update the user's url_pic
        $user->update(['url_pic' => $url]);
        
        // Update the tutor's data from JSON data
        $tutor = Tutor::findOrFail($IdTutors);
        $tutor->update($jsonData);
        
        return response()->json($tutor, 200);
    }
    
    public function destroy($IdTutors)
    {
        $tutors = Tutor::findOrFail($IdTutors);
        $tutors->delete();
        return response()->json(['message' => 'Tutor eliminado correctamente'], 200);
    }
}
