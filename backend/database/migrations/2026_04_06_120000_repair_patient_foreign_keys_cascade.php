<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();
        if (! in_array($driver, ['mysql', 'mariadb'], true)) {
            return;
        }

        $this->recreatePatientFk('appointments', 'patient_id');
        $this->recreatePatientFk('payments', 'patient_id');
    }

    public function down(): void
    {
        //
    }

    private function recreatePatientFk(string $table, string $column): void
    {
        if (! Schema::hasTable($table) || ! Schema::hasColumn($table, $column)) {
            return;
        }

        $fk = DB::selectOne(
            'SELECT CONSTRAINT_NAME AS name FROM information_schema.KEY_COLUMN_USAGE
             WHERE TABLE_SCHEMA = DATABASE()
             AND TABLE_NAME = ?
             AND COLUMN_NAME = ?
             AND REFERENCED_TABLE_NAME = ?
             AND REFERENCED_COLUMN_NAME = ?',
            [$table, $column, 'patients', 'id']
        );

        if ($fk && is_string($fk->name) && $fk->name !== '') {
            try {
                DB::statement('ALTER TABLE `'.$table.'` DROP FOREIGN KEY `'.$fk->name.'`');
            } catch (\Throwable) {
                //
            }
        }

        try {
            Schema::table($table, function (Blueprint $blueprint) use ($column) {
                $blueprint->foreign($column)
                    ->references('id')
                    ->on('patients')
                    ->cascadeOnDelete();
            });
        } catch (\Throwable) {
            //
        }
    }
};
