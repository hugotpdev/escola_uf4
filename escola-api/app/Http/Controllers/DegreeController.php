<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDegreeRequest;
use App\Http\Requests\UpdateDegreeRequest;
use App\Models\Degree;
use Illuminate\Http\Request;

class DegreeController extends Controller
{
    public function index()
    {
        return response()->json(Degree::all());
    }

    public function store(StoreDegreeRequest $request)
    {
        $degree = Degree::create($request->validated());
        return response()->json($degree, 201);
    }

    public function update(UpdateDegreeRequest $request, $id)
    {
        $degree = Degree::find($id);

        if (!$degree) {
            return response()->json(['message' => 'Grado no encontrado'], 404);
        }

        $degree->update($request->validated());

        return response()->json($degree);
    }

    public function show($id)
    {
        $degree = Degree::find($id);

        if (!$degree) {
            return response()->json(['message' => 'Grado no encontrado'], 404);
        }

        return response()->json($degree);
    }

    public function destroy($id)
    {
        $degree = Degree::find($id);

        if (!$degree) {
            return response()->json(['message' => 'Grado no encontrado'], 404);
        }

        $degree->delete();
        return response()->json(['message' => 'Grado eliminado correctamente']);
    }

    public function showCourses($id)
    {
        $degree = Degree::with('courses')->findOrFail($id);
        return response()->json($degree->courses);
    }
}
