<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Http\Requests\StoreEnrollmentRequest;

class EnrollmentController extends Controller
{
    public function index()
    {
        return response()->json(Enrollment::with(['student.user', 'subject'])->get());
    }

    public function store(StoreEnrollmentRequest $request)
    {
        $data = $request->validated();
        $data['enrollment_date'] = now();

        $enrollment = Enrollment::create($data);
        return response()->json($enrollment, 201);
    }

    public function show($id)
    {
        $enrollment = Enrollment::with(['student.user', 'subject'])->find($id);

        if (!$enrollment) {
            return response()->json(['message' => 'Inscripción no encontrada'], 404);
        }

        return response()->json($enrollment);
    }
    public function destroy($id)
    {
        $enrollment = Enrollment::find($id);

        if (!$enrollment) {
            return response()->json(['message' => 'Inscripción no encontrada'], 404);
        }

        $enrollment->delete();
        return response()->json(['message' => 'Inscripción eliminada correctamente']);
    }
}
