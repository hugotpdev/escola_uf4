<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:30',
            'last_name' => 'required|string|max:30',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:4',
            'dni' => [
                'required',
                'string',
                'unique:students,dni',
                'regex:/^[0-9]{8}[A-Za-z]$/',
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
            'email.email' => 'El correo electrónico debe tener un formato válido',
            'email.unique' => 'El correo electrónico ya está registrado',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres',

            'password.required' => 'La contraseña es obligatoria',
            'password.string' => 'La contraseña debe ser un texto válido',
            'password.min' => 'La contraseña debe tener al menos 4 caracteres',

            'dni.required' => 'El DNI es obligatorio',
            'dni.string' => 'El DNI debe ser un texto',
            'dni.unique' => 'El DNI ya está registrado',
            'dni.regex' => 'El DNI debe tener 8 dígitos seguidos de una letra (ej: 12345678A)',
        ];
    }
}
