<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('degree')->get();
        return response()->json($courses);
    }

    public function show($id)
    {
        $course = Course::with('degree')->find($id);

        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        return response()->json($course);
    }

    public function store(StoreCourseRequest $request)
    {
        $course = Course::create($request->validated());
        return response()->json($course, 201);
    }

    public function update(UpdateCourseRequest $request, $id)
{
    $course = Course::find($id);

    if (!$course) {
        return response()->json(['message' => 'Curso no encontrado'], 404);
    }

    $course->update($request->validated());

    return response()->json($course);
}


    public function destroy($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        $course->delete();

        return response()->json(['message' => 'Curso eliminado correctamente']);
    }

    public function showSubjects($id)
    {
        $course = Course::with('subjects')->find($id);

        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        return response()->json($course->subjects);
    }
}
