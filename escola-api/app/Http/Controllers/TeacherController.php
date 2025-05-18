<?php
namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Str;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::with(['user', 'department'])->get();
        return response()->json($teachers);
    }

    public function show($id)
    {
        $teacher = Teacher::with(['user', 'department'])->findOrFail($id);
        return response()->json($teacher);
    }

    public function store(StoreTeacherRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'user_type' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $user->id,
            'department_id' => $request->department_id,
        ]);

        return response()->json([
            'message' => 'Profesor creado correctamente',
            'teacher' => $teacher->load('user'),
        ], 201);
    }

    public function update(UpdateTeacherRequest $request, $id)
    {
        $teacher = Teacher::with('user')->findOrFail($id);

        // Actualiza solo el campo de Teacher
        $teacher->update([
            'department_id' => $request->department_id,
        ]);

        // Actualiza campos del modelo User
        $user = $teacher->user;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return response()->json($teacher->load('user'));
    }



    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        $teacher->user()->delete();

        return response()->json(['message' => 'Profesor eliminado correctamente']);
    }
}

