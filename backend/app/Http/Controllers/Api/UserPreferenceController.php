<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function getPreferences(Request $request)
    {
        $user = $request->user();
        return response()->json($user->preferences);
    }

    public function updatePreferences(Request $request)
    {
        $user = $request->user();
        $user->preferences()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'preferred_sources' => $request->preferred_sources,
                'preferred_categories' => $request->preferred_categories,
                'preferred_authors' => $request->preferred_authors,
            ]
        );

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
