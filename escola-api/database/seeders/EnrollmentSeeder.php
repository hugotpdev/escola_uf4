<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        $student = Student::first();
        $subject = Subject::first();

        if ($student && $subject) {
            Enrollment::firstOrCreate([
                'student_id' => $student->id,
                'subject_id' => $subject->id,
                'enrollment_date' => Carbon::now()->toDateString(),
            ]);
        }
    }
}

