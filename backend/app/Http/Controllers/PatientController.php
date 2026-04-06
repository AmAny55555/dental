<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\Patient;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

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

    public function show(Patient $patient): JsonResponse
    {
        return response()->json([
            'data' => $patient,
        ], 200);
    }

    public function update(UpdatePatientRequest $request, Patient $patient): JsonResponse
    {
        try {
            $patient->update($request->validated());

            return response()->json([
                'message' => 'Patient updated successfully',
                'data' => $patient,
            ], 200);
        } catch (QueryException $e) {
            report($e);

            return response()->json([
                'message' => config('app.debug') ? $e->getMessage() : 'Could not update patient.',
            ], 422);
        }
    }

    public function destroy(Patient $patient): JsonResponse
    {
        try {
            DB::transaction(function () use ($patient) {
                $patient->appointments()->delete();
                $patient->payments()->delete();
                $patient->delete();
            });
        } catch (QueryException $e) {
            report($e);

            return response()->json([
                'message' => config('app.debug') ? $e->getMessage() : 'Could not delete patient.',
            ], 409);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'message' => config('app.debug') ? $e->getMessage() : 'Could not delete patient.',
            ], 500);
        }

        return response()->json([
            'message' => 'Patient deleted successfully',
        ], 200);
    }
}
