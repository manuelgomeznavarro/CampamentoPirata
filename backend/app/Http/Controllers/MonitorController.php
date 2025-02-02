<?php

namespace App\Http\Controllers;

use App\Models\Monitor;
use Illuminate\Http\Request;

class MonitorController extends Controller
{
    
    public function index()
    {
        $monitors = Monitor::all();
        return response()->json($monitors, 200);
    }
    
    public function store(Request $request)
    {
    
        $monitors = Monitor::create($request->all());
        return response()->json($monitors, 201);
    }
    
    
    public function show($IdMonitors)
    {
        $monitors = Monitor::findOrFail($IdMonitors);
        return response()->json($monitors, 200);
    }
    
    
    public function update(Request $request, $IdMonitors)
    {
        $monitors = Monitor::findOrFail($IdMonitors);
        $monitors->update($request->all());
        return response()->json($monitors, 200);
    }
    
    public function destroy($IdMonitors)
    {
        $monitors = Monitor::findOrFail($IdMonitors);
        $monitors->delete();
        return response()->json(['message' => 'Monitor eliminado correctamente'], 200);
    }
}
