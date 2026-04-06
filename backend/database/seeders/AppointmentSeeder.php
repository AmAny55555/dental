<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Patient;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $patients = Patient::all();

        Appointment::create([
            'patient_id' => $patients[0]->id,
            'date' => Carbon::today(),
            'time' => '10:00:00',
            'status' => 'done',
            'notes' => 'تنظيف أسنان',
        ]);

        Appointment::create([
            'patient_id' => $patients[1]->id,
            'date' => Carbon::today(),
            'time' => '12:00:00',
            'status' => 'pending',
            'notes' => 'حشو عصب (مؤجل)',
        ]);

        Appointment::create([
            'patient_id' => $patients[2]->id,
            'date' => Carbon::today(),
            'time' => '14:00:00',
            'status' => 'done',
            'notes' => 'كشف عادي',
        ]);
    }
}
