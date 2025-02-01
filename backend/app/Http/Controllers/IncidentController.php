<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incident;
class IncidentController extends Controller
{
    //Obtener incidentes

    public function index()
    {
        $incidents = Incident::all();
        return response()->json($incidents);
    }

    //Crear una nueva incidencia
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required|string|max:255',
            'subject'=>'required|string|max:255',
            'date'=>'required|date',
            'status'=>'required|string|max:255',
            'tutor_id'=>'required|string|max:255',
            'admin_id'=>'nullable|string|max:255',
        ]);
        
        $incident = Incident::create($request->all());

        return response()->json([
            'mensaje' => 'Incidencia creada correctamente',
            'incident' => $incident
        ], 201);
    }
}
