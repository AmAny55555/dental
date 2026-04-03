<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\Patient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search');

        $patients = Patient::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('phone', 'like', '%' . $search . '%');
                });
            })
            ->latest()
            ->get();

        return response()->json($patients, 200);
    }

    public function store(StorePatientRequest $request): JsonResponse
    {
        $patient = Patient::create($request->validated());

        return response()->json([
            'message' => 'Patient created successfully',
            'data' => $patient,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'message' => 'Patient not found',
            ], 404);
        }

        return response()->json([
            'data' => $patient,
        ], 200);
    }

    public function update(UpdatePatientRequest $request, $id): JsonResponse
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'message' => 'Patient not found',
            ], 404);
        }

        $patient->update($request->validated());

        return response()->json([
            'message' => 'Patient updated successfully',
            'data' => $patient->fresh(),
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'message' => 'Patient not found',
            ], 404);
        }

        $patient->delete();

        return response()->json([
            'message' => 'Patient deleted successfully',
        ], 200);
    }
}
