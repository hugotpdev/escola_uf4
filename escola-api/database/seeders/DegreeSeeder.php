<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Degree;

class DegreeSeeder extends Seeder
{
    public function run(): void
    {
        $degrees = [
            [
                'name' => 'Ingeniería Informática',
                'duration_years' => 4,
            ],
            [
                'name' => 'Matemáticas Aplicadas',
                'duration_years' => 3,
            ],
            [
                'name' => 'Física',
                'duration_years' => 4,
            ],
        ];

        foreach ($degrees as $degree) {
            Degree::firstOrCreate(['name' => $degree['name']], $degree);
        }
    }
}
