<?php

namespace App\Http\Requests;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $routePatient = $this->route('patient');
        $ignoreId = $routePatient instanceof Patient
            ? $routePatient->getKey()
            : $routePatient;

        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => [
                'required',
                'string',
                'max:255',
                Rule::unique('patients', 'phone')->ignore($ignoreId),
            ],
            'address' => ['nullable', 'string'],
            'job_title' => ['nullable', 'string', 'max:255'],
            'age' => ['nullable', 'integer', 'min:0'],

            'last_visit_date' => ['nullable', 'date'],
            'patient_status' => ['nullable', 'string', 'max:255'],
            'follow_up_notes' => ['nullable', 'string'],
            'next_follow_up_date' => ['nullable', 'date'],

            'allergies' => ['nullable', 'string'],
            'chronic_diseases' => ['nullable', 'string'],
            'current_medications' => ['nullable', 'string'],
            'medical_surgeries' => ['nullable', 'string'],
            'medical_notes' => ['nullable', 'string'],

            'treatment_diagnosis' => ['nullable', 'string'],
            'treatment_type' => ['nullable', 'string'],
            'treatment_sessions' => ['nullable', 'integer', 'min:0'],
            'treatment_status' => ['nullable', 'string', 'max:255'],
            'treatment_notes' => ['nullable', 'string'],
        ];
    }
}
