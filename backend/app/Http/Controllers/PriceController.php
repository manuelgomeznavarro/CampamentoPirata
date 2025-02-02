<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    public function index()
    {
        $prices = Price::all();
        return response()->json($prices, 200);
    }

    public function store(Request $request)
    {
        $prices = Price::create($request->all());
        return response()->json($prices, 201);
    }

    public function show($idPrices)
    {
        $prices = Price::findOrFail($idPrices);
        return response()->json($prices, 200);
    }

    public function update(Request $request, $idPrices)
    {
        $prices = Price::findOrFail($idPrices);
        $prices->update($request->all());
        return response()->json($prices, 200);
    }

    public function destroy($idPrices)
    {
        $prices = Price::findOrFail($idPrices);
        $prices->delete();
        return response()->json(['message' => 'Precio eliminado correctamente'], 200);
    }
}
