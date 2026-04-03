<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'job_title',
        'age',

        'last_visit_date',
        'patient_status',
        'follow_up_notes',
        'next_follow_up_date',

        'allergies',
        'chronic_diseases',
        'current_medications',
        'medical_surgeries',
        'medical_notes',

        'treatment_diagnosis',
        'treatment_type',
        'treatment_sessions',
        'treatment_status',
        'treatment_notes',
    ];
}
