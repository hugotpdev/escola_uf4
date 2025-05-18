<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('subjects')->where(function ($query) {
                    return $query->where('course_id', $this->course_id);
                }),
            ],
            'course_id' => 'required|exists:courses,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la asignatura es obligatorio',
            'name.string' => 'El nombre debe ser un texto válido',
            'name.max' => 'El nombre no puede tener más de 255 caracteres',
            'name.unique' => 'Ya existe una asignatura con ese nombre en este curso',
            'course_id.required' => 'El ID del curso es obligatorio',
            'course_id.exists' => 'El curso especificado no existe',
        ];
    }
}
