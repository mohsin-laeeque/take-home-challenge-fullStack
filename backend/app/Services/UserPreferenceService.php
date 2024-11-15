<?php

namespace App\Services;

class UserPreferenceService
{
    public function getUserPreferences($user)
    {
        return $user->preferences;
    }

    public function updateUserPreferences($user, $data)
    {
        $user->preferences()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'preferred_sources' => $data['preferredSources'] ?? [],
                'preferred_authors' => $data['preferredAuthors'] ?? [],
            ]
        );
    }
}
