<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Course;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $course = Course::first();

        if (!$course) {
            $this->command->info('No hay ningún curso disponible para asignar subjects.');
            return;
        }

        $subjects = [
            ['name' => 'Programación Frontend', 'course_id' => $course->id],
            ['name' => 'Modelado de Bases de Datos', 'course_id' => $course->id],
        ];

        foreach ($subjects as $subject) {
            $exists = Subject::where('name', $subject['name'])
                ->where('course_id', $subject['course_id'])
                ->first();

            if (!$exists) {
                Subject::create($subject);
            }
        }
    }
}
