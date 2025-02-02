<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments, 200);
    }

    public function store(Request $request)
    {
        $payments = Payment::create($request->all());
        return response()->json($payments, 201);
    }

    public function show($idPayments)
    {
        $payments = Payment::findOrFail($idPayments);
        return response()->json($payments, 200);
    }

    public function update(Request $request, $idPayments)
    {
        $payments = Payment::findOrFail($idPayments);
        $payments->update($request->all());
        return response()->json($payments, 200);
    }

    public function destroy($idPayments)
    {
        $payments = Payment::findOrFail($idPayments);
        $payments->delete();
        return response()->json(['message' => 'Pago eliminado correctamente'], 200);
    }
}
