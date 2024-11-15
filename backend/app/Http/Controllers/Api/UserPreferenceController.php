<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\UserPreferenceService;
use App\Http\Requests\Api\UpdateUserPreferencesRequest;
use Illuminate\Support\Facades\Log;

class UserPreferenceController extends Controller
{
    protected $userPreferenceService;

    public function __construct(UserPreferenceService $userPreferenceService)
    {
        $this->userPreferenceService = $userPreferenceService;
    }

    public function getPreferences(Request $request)
    {
        try {
            $preferences = $this->userPreferenceService->getUserPreferences($request->user());
            return response()->json($preferences);
        } catch (\Exception $e) {
            Log::error('Error fetching user prefrences: ' . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

    public function updatePreferences(UpdateUserPreferencesRequest $request)
    {
        try {
            $this->userPreferenceService->updateUserPreferences($request->user(), $request->validated());
            return response()->json(['message' => 'Preferences updated successfully']);
        } catch (\Exception $e) {
            Log::error('Error updating user prefrences: ' . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
