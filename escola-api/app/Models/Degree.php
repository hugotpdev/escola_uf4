<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'duration_years'];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}