<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:4',
            'department_id' => 'required|exists:departments,id',
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'El nombre es obligatorio',
            'first_name.string' => 'El nombre debe ser un texto válido',
            'first_name.max' => 'El nombre es muy largo',

            'last_name.required' => 'El apellido es obligatorio',
            'last_name.string' => 'El apellido debe ser un texto válido',
            'last_name.max' => 'El apellido es muy largo',

            'email.required' => 'El correo electrónico es obligatorio',
            'email.email' => 'El correo electrónico debe ser válido',
            'email.unique' => 'El correo electrónico ya está registrado',

            'password.required' => 'La contraseña es obligatoria',
            'password.string' => 'La contraseña debe ser un texto válido',
            'password.min' => 'La contraseña es muy corta',

            'department_id.required' => 'El departamento es obligatorio',
            'department_id.exists' => 'El departamento no existe',
        ];
    }
}
