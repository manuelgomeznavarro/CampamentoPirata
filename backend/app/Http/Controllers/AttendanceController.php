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


    public function update(Request $request, $idAttendance)
    {
        $attendances = Attendance::findOrFail($idAttendance);
        $attendances->update($request->all());
        return response()->json($attendances, 200);
    }

    public function destroy($idAttendance)
    {
        $attendances = Attendance::findOrFail($idAttendance);
        $attendances->delete();
        return response()->json(['message' => 'Asistencia eliminada correctamente'], 200);
    }
}
