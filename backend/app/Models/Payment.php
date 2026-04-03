<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'patient_id',
        'total_amount',
        'paid',
        'remaining',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
        'total_amount' => 'decimal:2',
        'paid' => 'decimal:2',
        'remaining' => 'decimal:2',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
