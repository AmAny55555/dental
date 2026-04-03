<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $patientId = $request->query('patient_id');

        $payments = Payment::query()
            ->with('patient')
            ->when($patientId, function ($query) use ($patientId) {
                $query->where('patient_id', $patientId);
            })
            ->latest()
            ->get();

        return response()->json($payments);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'total_amount' => ['required', 'numeric'],
            'paid' => ['required', 'numeric'],
            'remaining' => ['required', 'numeric'],
            'date' => ['nullable', 'date'],
        ]);

        $payment = Payment::create($validated);

        return response()->json([
            'message' => 'Payment created successfully',
            'data' => $payment,
        ], 201);
    }

    public function show(Payment $payment): JsonResponse
    {
        return response()->json(
            $payment->load('patient')
        );
    }

    public function update(Request $request, Payment $payment): JsonResponse
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'total_amount' => ['required', 'numeric'],
            'paid' => ['required', 'numeric'],
            'remaining' => ['required', 'numeric'],
            'date' => ['nullable', 'date'],
        ]);

        $payment->update($validated);

        return response()->json([
            'message' => 'Payment updated successfully',
            'data' => $payment->fresh(),
        ]);
    }

    public function destroy(Payment $payment): JsonResponse
    {
        $payment->delete();

        return response()->json([
            'message' => 'Payment deleted successfully',
        ]);
    }
}
