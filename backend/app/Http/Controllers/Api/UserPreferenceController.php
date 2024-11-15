<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\UserPreferenceService;

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

    public function updatePreferences(Request $request)
    {
        $request->validate([
            'preferredSources' => 'nullable|array',
            'preferredAuthors' => 'nullable|array',
        ]);

        $this->userPreferenceService->updateUserPreferences($request->user(), $request->all());

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
