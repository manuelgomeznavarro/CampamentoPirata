<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins, 200);
    }
    
    public function store(Request $request)
    {
    
        $admins = Admin::create($request->all());
        return response()->json($admins, 201);
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
