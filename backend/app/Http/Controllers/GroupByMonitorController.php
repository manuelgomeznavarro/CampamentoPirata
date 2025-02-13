<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Child;
use App\Models\Inscription;
use App\Models\Tutor;
use App\Models\User;

class GroupByMonitorController extends Controller
{
    public function children_data(Request $request)
    {
        $group = Group::where('monitor_id', $request->monitor_id)->first();
        if (!$group) {
            return response()->json([
                'success' => false,
                'message' => 'Group not found'
            ], 401);
        }
        $children = Child::where('group_id', $group->id)->get();

        for ($i = 0; $i < $children->count(); $i++) {
            $inscription = Inscription::where('child_id', $children[$i]->id)->first();
            $tutor = Tutor::where('id', $inscription->tutor_id)->first();
            $user = User::where('role', 'tutor')->where('role_id', $tutor->id)->first();
            $children[$i]->tutor_phone = $tutor->phone;
            $children[$i]->tutor_email = $user->email;
            $children[$i]->tutor_id = $tutor->id;
        }

        return response()->json([
            'success' => true,
            'message' => 'Group found',
            'children' => $children
        ], 200);
    }
}
