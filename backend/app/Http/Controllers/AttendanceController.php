<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

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
