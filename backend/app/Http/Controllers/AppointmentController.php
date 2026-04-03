<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $patientId = $request->query('patient_id');

        $appointments = Appointment::query()
            ->with('patient')
            ->when($patientId, function ($query) use ($patientId) {
                $query->where('patient_id', $patientId);
            })
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return response()->json($appointments);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'status' => ['required', 'in:pending,done,cancelled'],
            'notes' => ['nullable', 'string'],
        ]);

        $appointment = Appointment::create($validated);

        return response()->json([
            'message' => 'Appointment created successfully',
            'data' => $appointment->load('patient'),
        ], 201);
    }

    public function show(Appointment $appointment): JsonResponse
    {
        return response()->json(
            $appointment->load('patient')
        );
    }

    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'status' => ['required', 'in:pending,done,cancelled'],
            'notes' => ['nullable', 'string'],
        ]);

        $appointment->update($validated);

        return response()->json([
            'message' => 'Appointment updated successfully',
            'data' => $appointment->fresh()->load('patient'),
        ]);
    }

    public function destroy(Appointment $appointment): JsonResponse
    {
        $appointment->delete();

        return response()->json([
            'message' => 'Appointment deleted successfully',
        ]);
    }
}
