<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{

    public function index()
    {
        $students = Student::with('user')->get(); 

        return response()->json($students); 
    }

    public function show($id)
    {
        $student = Student::with('user')->find($id);

        if (!$student) {
            return response()->json(['error' => 'Estudiante no encontrado'], 404);
        }

        return response()->json($student);
    }


    public function store(StoreStudentRequest $request)
    {
        $user = auth()->user();

    if ($user && $user->user_type !== 'admin') {
        return response()->json(['message' => 'No autorizado'], 403);
    }
        $validated = $request->validated();
        
        $validated['enrollment_year'] = now()->year;  

        DB::beginTransaction();

        try {
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name'  => $validated['last_name'],
                'email'      => $validated['email'],
                'password'   => bcrypt($validated['password']), 
                'user_type'  => 'student', 
            ]);

            Student::create([
                'user_id'        => $user->id,
                'dni'            => $validated['dni'],
                'enrollment_year'=> $validated['enrollment_year'], 
            ]);

            DB::commit();

            return response()->json(['message' => 'Estudiante creado correctamente'], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'error'   => 'Error al crear el estudiante',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateStudentRequest $request, $id)
    {
        $student = Student::with('user')->findOrFail($id);

        $student->update([
            'dni' => $request->dni,
        ]);

        $student->user->first_name = $request->first_name;
        $student->user->last_name = $request->last_name;
        $student->user->email = $request->email;

        if ($request->filled('password')) {
            $student->user->password = bcrypt($request->password);
        }

        $student->user->save();

        return response()->json($student->load('user'));
    }



    public function destroy($id)
    {
        DB::beginTransaction();

        try {
            $student = Student::find($id);

            if (!$student) {
                return response()->json(['error' => 'Estudiante no encontrado'], 404);
            }

            $student->user()->delete();
            $student->delete();

            DB::commit();

            return response()->json(['message' => 'Estudiante eliminado correctamente']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error al eliminar el estudiante',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function showEnrollments($id)
    {
        $student = Student::with(['enrollments.subject'])->findOrFail($id);
        return response()->json($student->enrollments);
    }

}

