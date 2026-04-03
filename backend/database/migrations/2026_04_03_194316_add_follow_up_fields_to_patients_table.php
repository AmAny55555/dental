<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->date('last_visit_date')->nullable()->after('age');
            $table->string('patient_status')->nullable()->after('last_visit_date');
            $table->text('follow_up_notes')->nullable()->after('patient_status');
            $table->date('next_follow_up_date')->nullable()->after('follow_up_notes');
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn([
                'last_visit_date',
                'patient_status',
                'follow_up_notes',
                'next_follow_up_date',
            ]);
        });
    }
};
