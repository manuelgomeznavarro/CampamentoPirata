<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::all();
        return response()->json($groups, 200);
    }

    public function store(Request $request)
    {
        $groups = Group::create($request->all());
        return response()->json($groups, 201);
    }

    public function show($idGroups)
    {
        $groups = Group::findOrFail($idGroups);
        return response()->json($groups, 200);
    }

    public function update(Request $request, $idGroups)
    {
        $groups = Group::findOrFail($idGroups);
        $groups->update($request->all());
        return response()->json($groups, 200);
    }

    public function destroy($idGroups)
    {
        $groups = Group::findOrFail($idGroups);
        $groups->delete();
        return response()->json(['message' => 'Grupo eliminado correctamente'], 200);
    }
}
