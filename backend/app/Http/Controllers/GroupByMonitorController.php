<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Child;
class GroupByMonitorController extends Controller
{
    public function children_data(Request $request)
    {
        $group = Group::where('monitor_id', $request->monitor_id)->first();
        if(!$group){
            return response()->json([
                'success' => false,
                'message' => 'Group not found'
            ], 401);
        }
        $children = Child::where('group_id', $group->id)->get();
        return response()->json([
            'success' => true,
            'message' => 'Group found',
            'children' => $children
        ], 200);
    }
}
