<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;

class ExamController extends Controller
{
    public function index()
    {
        return response()->json(Exam::with('subject')->get());
    }

    public function show($id)
    {
        $exam = \App\Models\Exam::with('subject.course')->find($id);

        if (!$exam) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }

        return response()->json($exam);
    }


    public function store(StoreExamRequest $request)
    {
        $exam = Exam::create($request->validated());
        return response()->json($exam, 201);
    }

    public function update(UpdateExamRequest $request, $id)
    {
        $exam = \App\Models\Exam::find($id);

        if (!$exam) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }

        $exam->update($request->validated());

        return response()->json($exam);
    }


    public function destroy($id)
    {
        $exam = Exam::find($id);

        if (!$exam) {
            return response()->json(['message' => 'Examen no encontrado'], 404);
        }

        $exam->delete();
        return response()->json(['message' => 'Examen eliminado correctamente']);
    }
}
