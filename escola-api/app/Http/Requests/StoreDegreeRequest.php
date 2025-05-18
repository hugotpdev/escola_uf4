<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDegreeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:degrees,name',
            'duration_years' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio',
            'name.unique' => 'El nombre del grado ya está registrado',
            'duration_years.required' => 'La duración en años es obligatoria',
            'duration_years.integer' => 'La duración debe ser un número entero',
            'duration_years.min' => 'La duración mínima es 1 año',
        ];
    }
}
