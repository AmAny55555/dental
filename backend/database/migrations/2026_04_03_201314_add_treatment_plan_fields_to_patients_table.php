<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 public function up(): void
{
    Schema::table('patients', function (Blueprint $table) {

        if (!Schema::hasColumn('patients', 'treatment_diagnosis')) {
            $table->text('treatment_diagnosis')->nullable();
        }

        if (!Schema::hasColumn('patients', 'treatment_type')) {
            $table->text('treatment_type')->nullable();
        }

        if (!Schema::hasColumn('patients', 'treatment_sessions')) {
            $table->integer('treatment_sessions')->nullable();
        }

        if (!Schema::hasColumn('patients', 'treatment_status')) {
            $table->string('treatment_status')->nullable();
        }

        if (!Schema::hasColumn('patients', 'treatment_notes')) {
            $table->text('treatment_notes')->nullable();
        }

    });
}
   public function down(): void
{
    Schema::table('patients', function (Blueprint $table) {
        $columns = [];

        foreach ([
            'treatment_diagnosis',
            'treatment_type',
            'treatment_sessions',
            'treatment_status',
            'treatment_notes',
        ] as $col) {
            if (Schema::hasColumn('patients', $col)) {
                $columns[] = $col;
            }
        }

        if (!empty($columns)) {
            $table->dropColumn($columns);
        }
    });
}

};
