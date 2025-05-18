<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        $subject = Subject::first();

        if (!$subject) return;

        Exam::firstOrCreate([
            'subject_id' => $subject->id,
            'exam_date' => '2025-06-10 09:00:00',
            'description' => 'Examen final'
        ]);
        
        Exam::firstOrCreate([
            'subject_id' => $subject->id,
            'exam_date' => '2025-07-01 15:30:00',
            'description' => 'Recuperación'
        ]);
        
    }
}
