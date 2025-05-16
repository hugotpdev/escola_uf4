<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDepartmentRequest;

class DepartmentController extends Controller
{

    public function store(StoreDepartmentRequest $request)
    {
        $department = Department::create($request->validated());
    
        return response()->json($department, 201);
    }

    public function index()
    {
        $departments = Department::all();
        return response()->json($departments);
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
}