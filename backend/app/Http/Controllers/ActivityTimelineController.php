<?php

namespace App\Http\Controllers;

use App\Models\ActivityTimeline;
use Illuminate\Http\Request;

class ActivityTimelineController extends Controller
{
    public function index()
    {
        $activities = ActivityTimeline::all();
        return response()->json($activities, 200);
    }

    public function store(Request $request)
    {
        $activities = ActivityTimeline::create($request->all());
        return response()->json($activities, 201);
    }

    public function show($idActivities)
    {
        $activities = ActivityTimeline::findOrFail($idActivities);
        return response()->json($activities, 200);
    }

    public function update(Request $request, $idActivities)
    {
        $activities = ActivityTimeline::findOrFail($idActivities);
        $activities->update($request->all());
        return response()->json($activities, 200);
    }

    public function destroy($idActivities)
    {
        $activities = ActivityTimeline::findOrFail($idActivities);
        $activities->delete();
        return response()->json(['message' => 'Actividad del cronograma eliminada correctamente'], 200);
    }
}
