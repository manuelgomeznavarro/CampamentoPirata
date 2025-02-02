<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use Illuminate\Support\Facades\Validator;
class GroupController extends Controller
{
    //

    public function index()
    {
        $groups = Group::with(['monitors', 'activities'])->get();
        return response()->json($groups);
    }

    /**
     * Store a new group
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'admin_id' => 'required|exists:admins,_id',
            'monitor_id' => 'required|exists:monitors,_id',
            'timeline_id' => 'required|exists:timelines,_id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $group = Group::create($request->all());
        return response()->json($group, 201);
    }

    /**
     * Display the specified group
     */
    public function show($id)
    {
        $group = Group::with(['monitors', 'activities'])->find($id);
        
        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        return response()->json($group);
    }

    /**
     * Update the specified group
     */

    public function update(Request $request, $id)
    {
        $group = Group::find($id);

        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'admin_id' => 'required|exists:admins,_id',
            'monitor_id' => 'required|exists:monitors,_id',
            'timeline_id' => 'required|exists:timelines,_id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $group->update($request->all());
        return response()->json($group);
    }

    /**
     * Remove the specified group
     */
    public function destroy($id)
    {
        $group = Group::find($id);

        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        $group->delete();
        return response()->json(['message' => 'Group deleted']);
    }
}
