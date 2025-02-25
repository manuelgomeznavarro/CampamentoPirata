<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    public function get_user_pic(Request $request) {
        $user = User::where('role', $request->role)
            ->where('role_id', $request->role_id)
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'url' => $user->url_pic
        ]);
    }
}
