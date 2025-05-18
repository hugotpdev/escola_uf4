<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function prepareForValidation()
    {
        $course = \App\Models\Course::find($this->route('course'));

        if ($course) {
            $this->merge([
                'course_id' => $course->id,
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('courses')->where(function ($query) {
                    return $query->where('degree_id', $this->degree_id);
                })->ignore($this->course_id),
            ],
            'degree_id' => 'required|exists:degrees,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del curso es obligatorio',
            'name.string' => 'El nombre del curso debe ser un texto válido',
            'name.max' => 'El nombre del curso no puede tener más de 255 caracteres',
            'name.unique' => 'Ya existe un curso con ese nombre en este grado',
            'degree_id.required' => 'El campo grado es obligatorio',
            'degree_id.exists' => 'El grado seleccionado no existe',
        ];
    }
}

