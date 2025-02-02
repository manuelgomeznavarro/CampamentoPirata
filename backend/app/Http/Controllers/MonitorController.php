<?php
namespace App\Http\Controllers;

use App\Models\Monitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MonitorController extends Controller
{
    /**
     * Mostrar todos los monitores
     */
    public function index()
    {
        $monitors = Monitor::with(['groups', 'admins', 'activities'])->get();
        return response()->json($monitors);
    }

    /**
     * Almacenar un nuevo monitor
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:monitors,email',
            'dni' => 'required|string|unique:monitors,dni',
            'phone' => 'required|string',
            'phone2' => 'nullable|string',
            'admin_id' => 'nullable|exists:admins,id' // Corrección aquí
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $monitor = Monitor::create($request->all());
        return response()->json($monitor, 201);
    }

    /**
     * Mostrar un monitor específico
     */
    public function show($id)
    {
        $monitor = Monitor::with(['groups', 'admins', 'activities'])->find($id);
        
        if (!$monitor) {
            return response()->json(['message' => 'Monitor not found'], 404);
        }

        return response()->json($monitor);
    }

    /**
     * Actualizar un monitor
     */
    public function update(Request $request, $id)
    {
        $monitor = Monitor::find($id);

        if (!$monitor) {
            return response()->json(['message' => 'Monitor not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'lastname' => 'string|max:255',
            'email' => 'email|unique:monitors,email,' . $id,
            'dni' => 'string|unique:monitors,dni,' . $id,
            'phone' => 'string',
            'phone2' => 'nullable|string',
            'admin_id' => 'nullable|exists:admins,id' // Corrección aquí
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $monitor->update($request->all());
        return response()->json($monitor);
    }

    /**
     * Eliminar un monitor
     */
    public function destroy($id)
    {
        $monitor = Monitor::find($id);

        if (!$monitor) {
            return response()->json(['message' => 'Monitor not found'], 404);
        }

        $monitor->delete();
        return response()->json(['message' => 'Monitor deleted successfully']);
    }
}
