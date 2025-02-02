<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;

class ChildController extends Controller
{
    public function index()
    {
        $children = Child::all();
        return response()->json($children, 200);
    }

    public function store(Request $request)
    {
        $children = Child::create($request->all());
        return response()->json($children, 201);
    }

    public function show($idChildren)
    {
        $children = Child::findOrFail($idChildren);
        return response()->json($children, 200);
    }

    public function update(Request $request, $idChildren)
    {
        $children = Child::findOrFail($idChildren);
        $children->update($request->all());
        return response()->json($children, 200);
    }

    public function destroy($idChildren)
    {
        $children = Child::findOrFail($idChildren);
        $children->delete();
        return response()->json(['message' => 'Niño eliminado correctamente'], 200);
    }
}
