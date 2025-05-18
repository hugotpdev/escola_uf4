<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'subject_id' => 'required|exists:subjects,id',
            'exam_date' => 'required|date|after_or_equal:now',
            'description' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'subject_id.required' => 'La asignatura es obligatoria',
            'subject_id.exists' => 'La asignatura no existe',
            'exam_date.required' => 'La fecha del examen es obligatoria',
            'exam_date.after_or_equal' => 'La fecha no puede ser en el pasado',
            'description.string' => 'La descripción debe ser texto válido',
            'description.max' => 'La descripción no puede exceder 255 caracteres',
        ];
    }
}
