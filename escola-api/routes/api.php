<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\DegreeController;
use App\Http\Controllers\CourseController; 
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\EnrollmentController;

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {

    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
    
    Route::apiResource('students', StudentController::class);
    Route::get('/students/{id}/enrollments', [StudentController::class, 'showEnrollments']);

    Route::apiResource('departments', DepartmentController::class);
    Route::get('/departments/{id}/teachers', [DepartmentController::class, 'showTeachers']);

    Route::apiResource('teachers', TeacherController::class);
    
    Route::apiResource('degrees', DegreeController::class);
    
    Route::apiResource('teachers', TeacherController::class);
    
    Route::apiResource('courses', CourseController::class);
    Route::get('/courses/{id}/subjects', [CourseController::class, 'showSubjects']);

    Route::get('/degrees/{id}/courses', [DegreeController::class, 'showCourses']);

    Route::apiResource('subjects', SubjectController::class);

    Route::apiResource('exams', ExamController::class);

    Route::apiResource('enrollments', EnrollmentController::class)->only([
        'index', 'show', 'store', 'destroy'
    ]);
    Route::get('/subjects/{id}/enrollments', [SubjectController::class, 'showEnrollments']);

});


