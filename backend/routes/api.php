<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    /*
     * Many shared hosts block or mishandle PUT/DELETE through Apache/nginx.
     * POST fallbacks use the same controller + Sanctum auth as the REST routes.
     */
    Route::post('patients/{patient}/update', [PatientController::class, 'update']);
    Route::post('patients/{patient}/delete', [PatientController::class, 'destroy']);

    Route::post('appointments/{appointment}/update', [AppointmentController::class, 'update']);
    Route::post('appointments/{appointment}/delete', [AppointmentController::class, 'destroy']);

    Route::apiResource('patients', PatientController::class);
    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('payments', PaymentController::class)->only(['index', 'store']);
});
