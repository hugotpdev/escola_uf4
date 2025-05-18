<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;

class DepartmentController extends Controller
{

    public function index()
    {
        $departments = Department::all();
        return response()->json($departments);
    }

    public function show($id)
    {
        $department = Department::with('teachers')->find($id);

        if (!$department) {
            return response()->json(['message' => 'Departamento no encontrado'], 404);
        }

        return response()->json($department);
    }


    public function store(StoreDepartmentRequest $request)
    {
        $department = Department::create($request->validated());
    
        return response()->json($department, 201);
    }

    public function update(UpdateDepartmentRequest $request, $id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Departamento no encontrado'], 404);
        }

        $department->update($request->validated());

        return response()->json([
            'message' => 'Departamento actualizado correctamente',
            'department' => $department,
        ]);
    } 

    public function destroy($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Departamento no encontrado'], 404);
        }

        $department->delete();

        return response()->json(['message' => 'Departamento eliminado correctamente']);
    }

    public function showTeachers($id)
    {
        $department = Department::with('teachers.user')->findOrFail($id);

        return response()->json($department->teachers);
    }

}