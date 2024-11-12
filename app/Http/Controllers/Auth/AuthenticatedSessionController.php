<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // $request->authenticate();

        // $request->session()->regenerate();

        // return response()->noContent();

        $request->authenticate();

        // Regenerate the session to prevent session fixation
        $request->session()->regenerate();

        // Retrieve the authenticated user
        $user = Auth::user();

        // Create a token for the user
        $token = $user->createToken('API Token')->plainTextToken;

        // Return the token and user details in the response
        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
