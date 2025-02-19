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

    public function get_current_activity($timeline_id)
    {
        // Get current date and time
        $currentDate = now()->toDateString();
        $currentTime = now();

        // Find all activities for today
        $activities = ActivityTimeline::where('timeline_id', $timeline_id)
            ->where('date', $currentDate)
            ->get();

        $currentActivity = null;

        foreach ($activities as $activity) {
            // Convert activity start time to Carbon instance
            $startTime = \Carbon\Carbon::createFromFormat(
                'Y-m-d H:i:s',
                $currentDate . ' ' . $activity->hour
            );
            
            // Calculate end time by adding duration in minutes
            $endTime = $startTime->copy()->addMinutes($activity->duration);
            
            // Check if current time falls within the activity's time window
            if ($currentTime->between($startTime, $endTime)) {
                $currentActivity = $activity;
                break;
            }
        }

        // If no ongoing activity is found
        if (!$currentActivity) {
            return response()->json([
                'message' => 'No activity in progress at the current time'
            ], 404);
        }

        // Get the activity details
        $activity = Activity::findOrFail($currentActivity->activity_id);

        // Calculate remaining time
        $startTime = \Carbon\Carbon::createFromFormat(
            'Y-m-d H:i:s',
            $currentDate . ' ' . $currentActivity->hour
        );
        $endTime = $startTime->copy()->addMinutes($currentActivity->duration);
        $remainingMinutes = $currentTime->diffInMinutes($endTime);

        // Return the current activity with its details
        return response()->json([
            'activity_timeline' => $currentActivity,
            'activity_details' => [
                'name' => $activity->name,
                'description' => $activity->description,
                'start_time' => $startTime->format('H:i:s'),
                'end_time' => $endTime->format('H:i:s'),
                'duration' => $currentActivity->duration,
                'elapsed_time' => $currentTime->diffInMinutes($startTime) . ' minutes',
                'remaining_time' => $remainingMinutes . ' minutes',
                'progress_percentage' => round(
                    ($currentTime->diffInMinutes($startTime) / $currentActivity->duration) * 100, 
                    1
                ) . '%'
            ]
        ], 200);
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
