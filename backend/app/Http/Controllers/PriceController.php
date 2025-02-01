<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    // Obtener todos los prices
    public function index()
    {
        $prices = Price::all();
        return response()->json($prices);
    }

    // Crear un nuevo price
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|string|max:255'
        ]);

        $price = Price::create($request->all());

        return response()->json([
            'mensaje' => 'Price creado correctamente',
            'price' => $price
        ], 201);
    }

    // Obtener un Price por ID
    public function show($id)
    {
        $price = Price::find($id);

        if (!$price) {
            return response()->json(['mensaje' => 'Price no encontrado'], 404);
        }

        return response()->json($price);
    }

    // Actualizar un tutor
    public function update(Request $request, $id)
    {
        $price = Price::find($id);

        if (!$price) {
            return response()->json(['mensaje' => 'Price no encontrado'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|string|max:255'
        ]);

        $price->update($request->all());

        return response()->json([
            'mensaje' => 'Price actualizado correctamente',
            'price' => $price
        ]);
    }

    // Eliminar un price
    public function destroy($id)
    {
        $price = Price::find($id);

        if (!$price) {
            return response()->json(['mensaje' => 'Price no encontrado'], 404);
        }

        $price->delete();

        return response()->json(['mensaje' => 'Price eliminado correctamente']);
    }
}
