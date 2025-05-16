<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->user_type === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'  => 'required|string|max:30',
            'last_name'   => 'required|string|max:30',
            'email'       => 'required|email|unique:users,email|max:255',
            'password'    => 'required|string|min:6',
            'dni'          => [
                'required',
                'string',
                'unique:students,dni',
                'regex:/^[0-9]{8}[A-Za-z]$/',
            ],
        ];
    }
}
