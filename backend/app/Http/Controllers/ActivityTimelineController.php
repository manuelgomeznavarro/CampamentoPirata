<?php

namespace App\Http\Controllers;

use App\Models\Activity;
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

    public function show($timeline_id)
    {
        $activities = ActivityTimeline::where('timeline_id', $timeline_id)->get();
        return response()->json($activities, 200);
    }

    public function show_details($timeline_id)
    {
        $activities = ActivityTimeline::where('timeline_id', $timeline_id)->get();

        for ($i=0; $i < $activities->count(); $i++) { 
            $activity = Activity::where('id', $activities[$i]->activity_id)->first();
            $activities[$i]->name = $activity->name;
            $activities[$i]->description = $activity->description;
        }

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
