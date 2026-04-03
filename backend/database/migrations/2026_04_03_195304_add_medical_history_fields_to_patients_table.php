<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->text('medical_history')->nullable()->after('next_follow_up_date');
            $table->text('allergies')->nullable()->after('medical_history');
            $table->text('chronic_diseases')->nullable()->after('allergies');
            $table->text('current_medications')->nullable()->after('chronic_diseases');
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn([
                'medical_history',
                'allergies',
                'chronic_diseases',
                'current_medications',
            ]);
        });
    }
};
