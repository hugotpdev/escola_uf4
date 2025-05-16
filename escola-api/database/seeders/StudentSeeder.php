<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            [
                'first_name' => 'Ana',
                'last_name' => 'López',
                'email' => 'ana@student.com',
                'password' => bcrypt('password123'),
                'dni' => '12345678A',
            ],
            [
                'first_name' => 'Luis',
                'last_name' => 'Martínez',
                'email' => 'luis@student.com',
                'password' => bcrypt('password456'),
                'dni' => '87654321B',
            ]
        ];

        foreach ($students as $data) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'user_type' => 'student',
            ]);

            Student::create([
                'user_id' => $user->id,
                'dni' => $data['dni'],
                'enrollment_year' => now()->year,
            ]);
        }
    }
}
