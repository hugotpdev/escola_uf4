<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Student;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function prepareForValidation(): void
    {
        $student = Student::find($this->route('student'));

        if ($student) {
            $this->merge([
                'user_id' => $student->user_id,
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user_id),
            ],
            'password' => 'nullable|string|min:4',
            'dni' => [
                'required',
                'string',
                'regex:/^[0-9]{8}[A-Za-z]$/',
                Rule::unique('students', 'dni')->ignore($this->route('student')),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'El nombre es obligatorio',
            'first_name.string' => 'El nombre debe ser un texto válido',
            'first_name.max' => 'El nombre no puede tener más de 30 caracteres',

            'last_name.required' => 'El apellido es obligatorio',
            'last_name.string' => 'El apellido debe ser un texto válido',
            'last_name.max' => 'El apellido no puede tener más de 30 caracteres',

            'email.required' => 'El correo electrónico es obligatorio',
            'email.email' => 'El correo electrónico debe ser válido',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres',
            'email.unique' => 'El correo electrónico ya está registrado',

            'password.string' => 'La contraseña debe ser un texto válido',
            'password.min' => 'La contraseña debe tener al menos 4 caracteres',

            'dni.required' => 'El DNI es obligatorio',
            'dni.string' => 'El DNI debe ser un texto',
            'dni.regex' => 'El DNI debe tener 8 dígitos seguidos de una letra (ej: 12345678A)',
            'dni.unique' => 'El DNI ya está registrado',
        ];
    }
}
