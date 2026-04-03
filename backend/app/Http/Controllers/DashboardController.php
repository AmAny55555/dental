<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Appointment;
use App\Models\Payment;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats()
    {
        $today = Carbon::today();

        $totalPatients = Patient::count();

        $todayAppointments = Appointment::whereDate('date', $today)->count();

        $totalPayments = Payment::sum('paid');

        $followUpCases = Appointment::where('status', 'مؤجل')->count();

        $recentAppointments = Appointment::with('patient')
            ->whereDate('date', $today)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'patient_name' => $appointment->patient?->name ?? 'غير معروف',
                    'time' => $appointment->time,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                ];
            });

        return response()->json([
            'totalPatients' => $totalPatients,
            'todayAppointments' => $todayAppointments,
            'totalPayments' => $totalPayments,
            'followUpCases' => $followUpCases,
            'recentAppointments' => $recentAppointments,
        ]);
    }
}
