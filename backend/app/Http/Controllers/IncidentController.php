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

    public function show_incidents_by_admin($admin_id)
    {
        $incidents = Incident::where('admin_id', $admin_id) 
                            -> where('status', 'pending')
                            ->get();
                            //paginate(10)
        return response()->json($incidents);
    }

    public function show_incidents_by_tutor($tutor_id)
    {
        $incidents = Incident::where('tutor_id', $tutor_id) 
                            ->get();
                            //paginate(10)
        return response()->json($incidents);
    }
}
