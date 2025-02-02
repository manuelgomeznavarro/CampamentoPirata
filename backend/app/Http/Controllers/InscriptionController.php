<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function index()
    {
        $inscriptions = Inscription::all();
        return response()->json($inscriptions, 200);
    }

    public function store(Request $request)
    {
        $inscriptions = Inscription::create($request->all());
        return response()->json($inscriptions, 201);
    }

    public function show($idInscriptions)
    {
        $inscriptions = Inscription::findOrFail($idInscriptions);
        return response()->json($inscriptions, 200);
    }

    public function update(Request $request, $idInscriptions)
    {
        $inscriptions = Inscription::findOrFail($idInscriptions);
        $inscriptions->update($request->all());
        return response()->json($inscriptions, 200);
    }

    public function destroy($idInscriptions)
    {
        $inscriptions = Inscription::findOrFail($idInscriptions);
        $inscriptions->delete();
        return response()->json(['message' => 'Inscripcion eliminada correctamente'], 200);
    }
}
