<?php

namespace App\Http\Controllers;

use App\Models\Monitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MonitorController extends Controller
{
    /**
     * Display a listing of monitors
     */
    public function index()
    {
        $monitors = Monitor::with(['groups', 'admins', 'activities'])->get();
        return response()->json($monitors);
    }

    /**
     * Store a new monitor
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:monitors,email',
            'dni' => 'required|string|unique:monitors,dni',
            'phone' => 'required|string',
            'phone2' => 'nullable|string',
            'admin_id' => 'required|exists:admins,_id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $monitor = Monitor::create($request->all());
        return response()->json($monitor, 201);
    }

    /**
     * Display the specified monitor
     */
    public function show($id)
    {
        $monitor = Monitor::with(['groups', 'admins', 'activities'])->find($id);
        
        if (!$monitor) {
            return response()->json(['message' => 'Monitor not found'], 404);
        }

        return response()->json($monitor);
    }

    /**
     * Update the specified monitor
     */
    public function update(Request $request, $id)
    {
        $monitor = Monitor::find($id);

        if (!$monitor) {
            return response()->json(['message' => 'Monitor not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'lastname' => 'string|max:255',
            'email' => 'email|unique:monitors,email,' . $id,
            'dni' => 'string|unique:monitors,dni,' . $id,
            'phone' => 'string',
            'phone2' => 'nullable|string',
            'admin_id' => 'exists:admins,_id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $monitor->update($request->all());
        return response()->json($monitor);
    }

    /**
     * Remove the specified monitor
     */
    public function destroy($id)
    {
        $monitor = Monitor::find($id);

        if (!$monitor) {
            return response()->json(['message' => 'Monitor not found'], 404);
        }

        $monitor->delete();
        return response()->json(['message' => 'Monitor deleted successfully']);
    }
}
