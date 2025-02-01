<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    // Obtener todos los incripctions
    public function index()
    {
        $inscriptions = Inscription::all();
        return response()->json($inscriptions);
    }

    // Crear un nuevo inscription
    public function store(Request $request)
    {
        $request->validate([
            'inscription_date' => 'required|date',
            'tutor_id' => 'required|string',
            'child_id' => 'required|string'
        ]);

        $inscription = Inscription::create($request->all());

        return response()->json([
            'mensaje' => 'Inscription creado correctamente',
            'inscription' => $inscription
        ], 201);
    }

    // Obtener un tutor por ID
    public function show($id)
    {
        $inscription = Inscription::find($id);

        if (!$inscription) {
            return response()->json(['mensaje' => 'Inscription no encontrado'], 404);
        }

        return response()->json($inscription);
    }

    // Actualizar un inscription
    public function update(Request $request, $id)
    {
        $inscription = Inscription::find($id);

        if (!$inscription) {
            return response()->json(['mensaje' => 'Inscription no encontrado'], 404);
        }

        $request->validate([
            'inscription_date' => 'sometimes|date',
            'tutor_id' => 'sometimes|string',
            'child_id' => 'sometimes|string'
        ]);

        $inscription->update($request->all());

        return response()->json([
            'mensaje' => 'Inscription actualizado correctamente',
            'inscription' => $inscription
        ]);
    }

    // Eliminar un inscription
    public function destroy($id)
    {
        $inscription = Inscription::find($id);

        if (!$inscription) {
            return response()->json(['mensaje' => 'Inscription no encontrado'], 404);
        }

        $inscription->delete();

        return response()->json(['mensaje' => 'Inscription eliminado correctamente']);
    }
}
