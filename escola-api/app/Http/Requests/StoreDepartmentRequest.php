<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:departments,name',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del departamento es obligatorio',
            'name.string' => 'El nombre debe ser un texto válido',
            'name.max' => 'El nombre no puede tener más de 255 caracteres',
            'name.unique' => 'El nombre del departamento ya existe',
        ];
    }
}

