<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);

        if ($request->password !== env('CLINIC_PASSWORD')) {
            return response()->json([
                'message' => 'Invalid password',
            ], 401);
        }

        $user = User::first();

        if (! $user) {
            $user = User::create([
                'name' => 'Clinic Admin',
                'email' => 'admin@clinic.local',
                'password' => bcrypt('dummy-password'),
            ]);
        }

        $token = $user->createToken('clinic-system-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }
}
