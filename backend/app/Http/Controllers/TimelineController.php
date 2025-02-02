<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    public function index()
    {
        $timelines = Timeline::all();
        return response()->json($timelines, 200);

    }

    public function store(Request $request)
    {
        $timelines = Timeline::create($request->all());
        return response()->json($timelines, 201);
    }

    public function show($idTimelines)
    {
        $timelines = Timeline::findOrFail($idTimelines);
        return response()->json($timelines, 200);
    }

    public function update(Request $request, $idTimelines)
    {
        $timelines = Timeline::findOrFail($idTimelines);
        $timelines->update($request->all());
        return response()->json($timelines, 200);
    }

    public function destroy($idTimelines)
    {
        $timelines = Timeline::findOrFail($idTimelines);
        $timelines->delete();
        return response()->json(['message' => 'Timeline eliminado correctamente'], 200);
    }
}
