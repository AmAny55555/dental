<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payment;
use App\Models\Patient;
use Carbon\Carbon;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        $patients = Patient::all();

        Payment::create([
            'patient_id' => $patients[0]->id,
            'total_amount' => 1000,
            'paid' => 800,
            'remaining' => 200,
            'date' => Carbon::today(),
        ]);

        Payment::create([
            'patient_id' => $patients[1]->id,
            'total_amount' => 500,
            'paid' => 500,
            'remaining' => 0,
            'date' => Carbon::today(),
        ]);

        Payment::create([
            'patient_id' => $patients[2]->id,
            'total_amount' => 750,
            'paid' => 300,
            'remaining' => 450,
            'date' => Carbon::today(),
        ]);
    }
}
