<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    // Obtener todos los tutors
    public function index()
    {
        $tutors = Tutor::all();
        return response()->json($tutors);
    }

    // Crear un nuevo tutor
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:admin,email',
            'dni' => 'required|string|max:20|unique:admin,dni',
            'phone' => 'required|string|max:20',
            'phone2' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20'
        ]);

        $tutor = Tutor::create($request->all());

        return response()->json([
            'mensaje' => 'Tutor creado correctamente',
            'tutor' => $tutor
        ], 201);
    }

    // Obtener un tutor por ID
    public function show($id)
    {
        $tutor = Tutor::find($id);

        if (!$tutor) {
            return response()->json(['mensaje' => 'Tutor no encontrado'], 404);
        }

        return response()->json($tutor);
    }

    // Actualizar un tutor
    public function update(Request $request, $id)
    {
        $tutor = Tutor::find($id);

        if (!$tutor) {
            return response()->json(['mensaje' => 'Tutor no encontrado'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'lastname' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:admin,email,' . $id,
            'dni' => 'sometimes|string|max:20|unique:admin,dni,' . $id,
            'phone' => 'sometimes|string|max:20',
            'phone2' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20'
        ]);

        $tutor->update($request->all());

        return response()->json([
            'mensaje' => 'Tutor actualizado correctamente',
            'tutor' => $tutor
        ]);
    }

    // Eliminar un tutor
    public function destroy($id)
    {
        $tutor = Tutor::find($id);

        if (!$tutor) {
            return response()->json(['mensaje' => 'Tutor no encontrado'], 404);
        }

        $tutor->delete();

        return response()->json(['mensaje' => 'Tutor eliminado correctamente']);
    }
}