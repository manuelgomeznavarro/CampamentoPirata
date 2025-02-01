<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;

class AdminController extends Controller
{
    // Obtener todos los admins
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins);
    }

    // Crear un nuevo admin
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:admin,email',
            'dni' => 'required|string|max:20|unique:admin,dni',
            'phone' => 'required|string|max:20',
            'phone2' => 'nullable|string|max:20'
        ]);

        $admin = Admin::create($request->all());

        return response()->json([
            'mensaje' => 'Admin creado correctamente',
            'admin' => $admin
        ], 201);
    }

    // Obtener un admin por ID
    public function show($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['mensaje' => 'Admin no encontrado'], 404);
        }

        return response()->json($admin);
    }

    // Actualizar un admin
    public function update(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['mensaje' => 'Admin no encontrado'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'lastname' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:admin,email,' . $id,
            'dni' => 'sometimes|string|max:20|unique:admin,dni,' . $id,
            'phone' => 'sometimes|string|max:20',
            'phone2' => 'nullable|string|max:20'
        ]);

        $admin->update($request->all());

        return response()->json([
            'mensaje' => 'Admin actualizado correctamente',
            'admin' => $admin
        ]);
    }

    // Eliminar un admin
    public function destroy($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['mensaje' => 'Admin no encontrado'], 404);
        }

        $admin->delete();

        return response()->json(['mensaje' => 'Admin eliminado correctamente']);
    }
}
