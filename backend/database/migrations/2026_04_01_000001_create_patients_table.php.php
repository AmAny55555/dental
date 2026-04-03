<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('address')->nullable();
            $table->string('job_title')->nullable(); // ✅ اتعدل
            $table->unsignedInteger('age')->nullable();
            $table->string('phone')->unique();
            $table->text('notes')->nullable();

            // 🧠 التاريخ الطبي
            $table->text('medical_allergies')->nullable();
            $table->text('medical_diseases')->nullable();
            $table->text('medical_medicines')->nullable();
            $table->text('medical_surgeries')->nullable();
            $table->text('medical_notes')->nullable();

            // 🦷 خطة العلاج
            $table->text('treatment_diagnosis')->nullable();
            $table->string('treatment_type')->nullable();
            $table->unsignedInteger('treatment_sessions')->nullable();
            $table->string('treatment_status')->nullable();
            $table->text('treatment_notes')->nullable();

            // 🔄 المتابعة
            $table->date('last_visit_date')->nullable();
            $table->string('patient_status')->nullable();
            $table->text('follow_up_notes')->nullable();
            $table->date('next_follow_up_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
