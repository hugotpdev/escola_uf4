<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function prepareForValidation()
    {
        $teacher = \App\Models\Teacher::find($this->route('teacher'));

        if ($teacher) {
            $this->merge([
                'user_id' => $teacher->user_id,
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($this->user_id),
            ],
            'password' => 'nullable|string|min:4',
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

            'password.string' => 'La contraseña debe ser un texto válido',
            'password.min' => 'La contraseña es muy corta',

            'department_id.required' => 'El departamento es obligatorio',
            'department_id.exists' => 'El departamento no existe',
        ];
    }
}
