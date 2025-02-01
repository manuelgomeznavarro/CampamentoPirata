<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Child;

class ChildController extends Controller
{
    //Obtener todos los niños
    public function index()
        {
            $children = Child::all();
            return response()->json($children);
        }
    
    //Crear un nuevo niño
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|string|max:255',
            'lastname'=>'required|string|max:255',
            'birthdate'=>'required|date',
            't_shirt_size'=>'required|string|max:5',
            'alergy_intolerance'=>'nullable|string',
            'aditional_info'=>'nullable|string',
            'acquaintance'=>'nullable|string',
            'group_id'=>'nullable|string',
        ]);

        $child = Child::create($request->all());

        return response()->json([
            'mensaje'=>'Niño creado correctamente',
            'child'=> $child
        ],201);
    }

    public function show($id)
    {
        $child = Child::find($id);

        if(!$child){
            return response()->json(['mensaje'=>'Niño no encontrado'],404);
        }

        return response()->json($child);
    }

    //Actualizar un niño
    public function update(Request $request, $id)
    {
        $child = Child::find($id);

        if(!$child){
            return response()->json(['mensaje'=>'Niño no encontado'],404);
        }
        $request->validate([
            'name'=>'sometimes|string|max:255',
            'lastname' => 'sometimes|string|max:255',
            'birthdate' => 'sometimes|date',
            't_shirt_size' => 'sometimes|string|max:10',
            'alergy_intolerance' => 'sometimes|string',
            'aditional_info' => 'sometimes|string',
            'acquaintance' => 'sometimes|string',
            'group_id' => 'nullable|string'
        ]);

        $child->update($request->all());

        return response()->json([
            'mensaje'=> 'Niño actualizado correctamente',
            'child'=> $child
        ]);
    }

    //Eliminar un niño

    public function destroy($id)
    {
        $child =Child::find($id);

        if(!$child){
            return response()->json(['mensaje'=>'Niño no encontrado'], 404);
        }
        $child->delete();

        return response()->json(['mensaje'=> 'Niño eliminado correctamente']);
    }
    
}
