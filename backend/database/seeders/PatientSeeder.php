<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        Patient::create([
            'name' => 'أحمد محمد',
            'phone' => '01000000001',
            'age' => 30,
            'address' => 'القاهرة',
        ]);

        Patient::create([
            'name' => 'سارة علي',
            'phone' => '01000000002',
            'age' => 25,
            'address' => 'الجيزة',
        ]);

        Patient::create([
            'name' => 'محمد حسن',
            'phone' => '01000000003',
            'age' => 40,
            'address' => 'مدينة نصر',
        ]);
    }
}
