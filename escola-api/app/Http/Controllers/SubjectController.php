<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('course')->get();
        return response()->json($subjects);
    }

    public function show($id)
    {
        $subject = \App\Models\Subject::with('course')->find($id);

        if (!$subject) {
            return response()->json(['message' => 'Asignatura no encontrada'], 404);
        }

        return response()->json($subject);
    }


    public function store(StoreSubjectRequest $request)
    {
        $subject = Subject::create($request->validated());
        return response()->json($subject, 201);
    }

    public function update(UpdateSubjectRequest $request, $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Asignatura no encontrada'], 404);
        }
        $subject->update($request->validated());
        return response()->json($subject);
    }

    public function destroy($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Asignatura no encontrada'], 404);
        }
        $subject->delete();
        return response()->json(['message' => 'Asignatura eliminada correctamente']);
    }

    public function showEnrollments($id)
    {
        $subject = Subject::with('enrollments.student.user')->findOrFail($id);
        return response()->json($subject->enrollments);
    }
    

}