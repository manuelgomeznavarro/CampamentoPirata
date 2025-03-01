<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Timeline;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::all();
        return response()->json($attendances, 200);
    }

    public function store(Request $request)
    {
        $attendances = Attendance::create($request->all());
        return response()->json($attendances, 201);
    }
    
    public function show_attendaces_by_timeline_and_date(Request $request) {
        $timeline = Timeline::where('id', $request->timeline_id)->first();
        if (!$timeline) {
            return response()->json([
                'success' => false,
                'message' => 'Timeline not valid'
            ], 401);
        }

        $attendances = Attendance::where('timeline_id', $request->timeline_id)->whereDate('date', now())->get();

        return response()->json([
            'success' => true,
            'message' => 'Group found with valid timeline',
            'attendaces' => $attendances
        ], 200);
    }

    public function show($idAttendance)
    {
        $attendances = Attendance::findOrFail($idAttendance);
        return response()->json($attendances, 200);
    }


    public function update(Request $request)
    {
        // Validate that all required fields are present
        $request->validate([
            'child_id' => 'required',
            'timeline_id' => 'required',
            'date' => 'required|date',
            'attendance' => 'required'
        ]);

        // Find and update using where conditions
        $affected = Attendance::where('child_id', $request->child_id)
            ->where('timeline_id', $request->timeline_id)
            ->where('date', $request->date)
            ->update([
                'attendance' => $request->attendance
            ]);

        if ($affected === 0) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        // Fetch the updated record to return
        $attendance = Attendance::where('child_id', $request->child_id)
            ->where('timeline_id', $request->timeline_id)
            ->where('date', $request->date)
            ->first();

        return response()->json($attendance, 200);
    }

    public function destroy($idAttendance)
    {
        $attendances = Attendance::findOrFail($idAttendance);
        $attendances->delete();
        return response()->json(['message' => 'Asistencia eliminada correctamente'], 200);
    }

    public function show_comments_by_child(Request $request) {
        $comments = Attendance::where('child_id', $request->child_id)->get();
        return response()->json($comments, 200);
    }


    public function updateComments(Request $request)
    {
        // Validate that all required fields are present
        $request->validate([
            'child_id' => 'required',
            'timeline_id' => 'required',
            'comments' => 'required'
        ]);

        // Find and update using where conditions
        $attendances = Attendance::where('child_id', $request->child_id)
            ->where('timeline_id', $request->timeline_id)
            ->where('attendance', 1)->get();
            
        $affected = Attendance::where('child_id', $request->child_id)
            ->where('timeline_id', $request->timeline_id)
            ->where('date', $attendances->last()->date)
            ->update([
                'comments' => $request->comments
            ]);

        return response()->json($affected, 200);
    }

    public function getComments($child_id)
    {
        
        // Find and update using where conditions
        $attendance = Attendance::where('child_id', $child_id)
            ->where('attendance', 1)->get()->last();

        return response()->json($attendance, 200);
    }

    public function getBar($child_id)
    {
        
        // Find and update using where conditions
        $attendance = Attendance::where('child_id', $child_id)
            ->where('attendance', 1)->get();

        return response()->json($attendance, 200);
    }

}
