<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    public function index()
    {
        $incidents = Incident::all();
        return response()->json($incidents, 200);
    }

    public function store(Request $request)
    {
        $incidents = Incident::create($request->all());
        return response()->json($incidents, 201);
    }

    public function show($idIncidents)
    {
        $incidents = Incident::findOrFail($idIncidents);
        return response()->json($incidents, 200);
    }

    public function update(Request $request, $idIncidents)
    {
        $incidents = Incident::findOrFail($idIncidents);
        $incidents->update($request->all());
        return response()->json($incidents, 200);
    }

    public function destroy($idIncidents)
    {
        $incidents = Incident::findOrFail($idIncidents);
        $incidents->delete();
        return response()->json(['message' => 'Incidente eliminado correctamente'], 200);
    }
}
