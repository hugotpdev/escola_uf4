<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Degree;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {

        $degree1 = Degree::firstOrCreate(
            ['name' => 'Ingeniería Informática'],
            ['duration_years' => 4]
        );

        $degree2 = Degree::firstOrCreate(
            ['name' => 'Matemáticas Aplicadas'],
            ['duration_years' => 3]
        );


        Course::firstOrCreate(
            ['name' => 'Introducción a la Programación', 'degree_id' => $degree1->id]
        );

        Course::firstOrCreate(
            ['name' => 'Cálculo Avanzado', 'degree_id' => $degree2->id]
        );
    }
}
