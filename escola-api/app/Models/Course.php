<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['name', 'degree_id'];

    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
