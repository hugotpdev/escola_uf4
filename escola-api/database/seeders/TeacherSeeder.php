<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Teacher;
use App\Models\Department;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        // Crear solo dos departamentos nuevos
        $departmentsData = [
            'Física',
            'Química',
        ];

        $departments = [];
        foreach ($departmentsData as $name) {
            $departments[$name] = Department::firstOrCreate(['name' => $name]);
        }

        // Datos de dos profesores
        $teachers = [
            [
                'first_name' => 'Laura',
                'last_name' => 'Pérez',
                'email' => 'laura@teacher.com',
                'password' => bcrypt('password789'),
                'department' => 'Física',
            ],
            [
                'first_name' => 'Jorge',
                'last_name' => 'Sánchez',
                'email' => 'jorge@teacher.com',
                'password' => bcrypt('password321'),
                'department' => 'Química',
            ],
        ];

        foreach ($teachers as $data) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'user_type' => 'teacher',
            ]);

            Teacher::create([
                'user_id' => $user->id,
                'department_id' => $departments[$data['department']]->id,
            ]);
        }
    }
}
