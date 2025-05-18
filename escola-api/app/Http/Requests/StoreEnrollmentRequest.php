<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEnrollmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->user_type === 'admin';
    }

    public function rules(): array
    {
        return [
            'student_id' => [
                'required',
                'exists:students,id',
                Rule::unique('enrollments')->where(function ($query) {
                    return $query->where('subject_id', $this->subject_id);
                }),
            ],
            'subject_id' => 'required|exists:subjects,id',
        ];
    }

    public function messages(): array
    {
        return [
            'student_id.exists' => 'El estudiante no existe',
            'subject_id.exists' => 'La asignatura no existe',
            'student_id.unique' => 'El alumno ya está inscrito en esta asignatura',
        ];
    }
}
