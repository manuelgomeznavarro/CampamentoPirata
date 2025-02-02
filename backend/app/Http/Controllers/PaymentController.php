<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // Obtener todos los payments
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments);
    }

    // Crear un nuevo payment
    public function store(Request $request)
    {
        $request->validate([
            'payment_date' => 'required|date',
            'tutor_id' => 'required|string',
            'inscription_id' => 'required|string',
            'payment_method' => 'required|string|max:20|unique:admin,dni',
            'price_id' => 'required|string'
        ]);

        $payment = Payment::create($request->all());

        return response()->json([
            'mensaje' => 'Payment creado correctamente',
            'payment' => $payment
        ], 201);
    }

    // Obtener un payment por ID
    public function show($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['mensaje' => 'Payment no encontrado'], 404);
        }

        return response()->json($payment);
    }

    // Actualizar un payment
    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['mensaje' => 'Payment no encontrado'], 404);
        }

        $request->validate([
            'payment_date' => 'sometimes|date',
            'tutor_id' => 'sometimes|string',
            'inscription_id' => 'sometimes|string',
            'payment_method' => 'sometimes|string|max:20|unique:admin,dni',
            'price_id' => 'sometimes|string'
        ]);

        $payment->update($request->all());

        return response()->json([
            'mensaje' => 'Payment actualizado correctamente',
            'payment' => $payment
        ]);
    }

    // Eliminar un payment
    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['mensaje' => 'Payment no encontrado'], 404);
        }

        $payment->delete();

        return response()->json(['mensaje' => 'Payment eliminado correctamente']);
    }
}
