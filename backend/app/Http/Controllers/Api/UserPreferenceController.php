<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\UserPreferenceService;
use App\Http\Requests\Api\UpdateUserPreferencesRequest;

class UserPreferenceController extends Controller
{
    protected $userPreferenceService;

    public function __construct(UserPreferenceService $userPreferenceService)
    {
        $this->userPreferenceService = $userPreferenceService;
    }

    public function getPreferences(Request $request)
    {
        $preferences = $this->userPreferenceService->getUserPreferences($request->user());
        return response()->json($preferences);
    }

    public function updatePreferences(UpdateUserPreferencesRequest $request)
    {
        $this->userPreferenceService->updateUserPreferences($request->user(), $request->validated());
        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
