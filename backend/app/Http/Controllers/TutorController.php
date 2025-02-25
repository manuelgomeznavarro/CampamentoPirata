<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use App\Models\Tutor;
use App\Models\User;
use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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
        $tutors = Tutor::findOrFail($IdTutors);
        $tutors->update($request->all());
        return response()->json($tutors, 200);
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
