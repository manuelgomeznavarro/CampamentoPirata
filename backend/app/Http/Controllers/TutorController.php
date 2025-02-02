<?php

namespace App\Http\Controllers;

use App\Models\Tutor;
use Illuminate\Http\Request;

class TutorController extends Controller
{
    public function index()
    {
        $tutors = Tutor::all();
        return response()->json($tutors, 200);
    }
    
    public function store(Request $request)
    {
    
        $tutors = Tutor::create($request->all());
        return response()->json($tutors, 201);
    }
    
    
    public function show($IdTutors)
    {
        $tutors = Tutor::findOrFail($IdTutors);
        return response()->json($tutors, 200);
    }
    
    
    public function update(Request $request, $IdTutors)
    {
        $tutors = Tutor::findOrFail($IdTutors);
        $tutors->update($request->all());
        return response()->json($tutors, 200);
    }
    
    public function destroy($IdTutors)
    {
        $tutors = Tutor::findOrFail($IdTutors);
        $tutors->delete();
        return response()->json(['message' => 'Tutor eliminado correctamente'], 200);
    }
}
