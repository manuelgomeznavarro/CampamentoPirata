<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    // Obtener todos los timelines
    public function index()
    {
        $timelines = Timeline::all();
        return response()->json($timelines);
    }

    // Crear un nuevo timeline
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'admin_id' => 'required|string'
        ]);

        $timeline = Timeline::create($request->all());

        return response()->json([
            'mensaje' => 'Timeline creado correctamente',
            'timeline' => $timeline
        ], 201);
    }

    // Obtener un timeline por ID
    public function show($id)
    {
        $timeline = Timeline::find($id);

        if (!$timeline) {
            return response()->json(['mensaje' => 'Timeline no encontrado'], 404);
        }

        return response()->json($timeline);
    }

    // Actualizar un timeline
    public function update(Request $request, $id)
    {
        $timeline = Timeline::find($id);

        if (!$timeline) {
            return response()->json(['mensaje' => 'Timeline no encontrado'], 404);
        }

        $request->validate([
            'date' => 'sometimes|date',
            'admin_id' => 'sometimes|string'
        ]);

        $timeline->update($request->all());

        return response()->json([
            'mensaje' => 'Timeline actualizado correctamente',
            'timeline' => $timeline
        ]);
    }

    // Eliminar un timeline
    public function destroy($id)
    {
        $timeline = Timeline::find($id);

        if (!$timeline) {
            return response()->json(['mensaje' => 'Timeline no encontrado'], 404);
        }

        $timeline->delete();

        return response()->json(['mensaje' => 'Timeline eliminado correctamente']);
    }
}
