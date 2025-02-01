<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
class ActivityController extends Controller
{
    //Obtener todas las actividades

    public function index()
    {
        $activities = Activity::all();
        return response()->json($activities);
    }

    //Crear una nueva actividad

    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'required|string|max:255',
            'duration'=>'required|string|max:255',
        ]);

        $activity = Activity::create($request->all());

        return response()->json([
            'mensaje'=> 'Actividad creada correctamente',
            'activity'=> $activity
        ], 201);
    }

    //Obtener una actividad por ID
    public function show($id)
    {
        $activity = Activity::fnd($id);

        if(!$activity){
            return response()->json(['mensaje'=>'Actividad no encontrada'],404);
        }

        return response()->json($activity);
    }

    //Actualizar un admin
    public function update(Request $request, $id)
    {
        $activity = Activity::find($id);

        if(!$activity){
            return response()->json(['mensaje'=> 'Actividad no encontrada'],404);
        }

        $request->validate([
            'name'=>'sometimes|string|max:255',
            'description'=>'sometimes|string|max:255',
            'duration'=>'sometimes|string|max:255',
        ]);

        $activity->update($request->all());

        return response()->json([
            'mensaje'=>'Actividad actualizada correctamente',
            'activity' => $activity
        ]);
    }

    // Eliminar una actividad
    public function destroy($id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['mensaje' => 'Actividad no encontrada'], 404);
        }

        $activity->delete();

        return response()->json(['mensaje' => 'Actividad eliminada correctamente']);
    }
}
