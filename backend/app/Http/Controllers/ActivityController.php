<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::all();
        return response()->json($activities, 200);
    }

    public function store(Request $request)
    {
        $activities = Activity::create($request->all());
        return response()->json($activities, 201);
    }

    public function show($idActivities)
    {
        $activities = Activity::findOrFail($idActivities);
        return response()->json($activities, 200);
    }

    public function update(Request $request, $idActivities)
    {
        $activities = Activity::findOrFail($idActivities);
        $activities->update($request->all());
        return response()->json($activities, 200);
    }

    public function destroy($idActivities)
    {
        $activities = Activity::findOrFail($idActivities);
        $activities->delete();
        return response()->json(['message' => 'Actividad eliminada correctamente'], 200);
    }
}
