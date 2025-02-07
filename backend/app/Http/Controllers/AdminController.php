<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins, 200);
    }
    
    public function store(Request $request)
    {

        try {
            $existingUser = User::where('email', $request->email)->first();

            if ($existingUser) {
                return response()->json([
                    'message' => 'Este email ya esta siendo usado',
                    'error' => 'Duplicate email'
                ], 422);
            }

            DB::beginTransaction();
            
            // Create the tutor
            $admin = Admin::create([
                'name' => $request->name,
                'lastname' => $request->lastname,
                'dni' => $request->dni,
                'phone' => $request->phone,
                'phone2' => $request->phone2,
            ]);

            // Create the associated user
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'admin',
                'role_id' => $admin->id
            ]);

            DB::commit();
            
            // return response()->json([
            //     'message' => 'Admin creado correctamente',
            //     'tutor' => $admin
            // ], 201);

            $admins = Admin::all();
            return response()->json($admins, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error creating admin',
                'error' => $e->getMessage()
            ], 500);
        }
    
        // $admins = Admin::create($request->all());
        // return response()->json($admins, 201);
    }
    
    
    public function show($IdAdmins)
    {
        $admins = Admin::findOrFail($IdAdmins);
        return response()->json($admins, 200);
    }
    
    
    public function update(Request $request, $IdAdmins)
    {
        $admins = Admin::findOrFail($IdAdmins);
        $admins->update($request->all());
        return response()->json($admins, 200);
    }
    
    public function destroy($IdAdmins)
    {
        $admins = Admin::findOrFail($IdAdmins);
        $admins->delete();
        return response()->json(['message' => 'Admin eliminado correctamente'], 200);
    }
}
