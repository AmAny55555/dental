<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('payments', 'patient_id')) {
            Schema::table('payments', function (Blueprint $table) {
                $table->foreignId('patient_id')->after('id')->constrained()->cascadeOnDelete();
                $table->decimal('total_amount', 10, 2)->after('patient_id');
                $table->decimal('paid', 10, 2)->after('total_amount');
                $table->decimal('remaining', 10, 2)->after('paid');
                $table->date('date')->after('remaining');
            });
        }
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['patient_id']);
            $table->dropColumn([
                'patient_id',
                'total_amount',
                'paid',
                'remaining',
                'date',
            ]);
        });
    }
};
