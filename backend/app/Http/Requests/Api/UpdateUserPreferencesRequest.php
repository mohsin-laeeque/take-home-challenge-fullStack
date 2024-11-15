<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserPreferencesRequest extends FormRequest
{
    public function rules()
    {
        return [
            'preferredSources' => 'nullable|array',
            'preferredAuthors' => 'nullable|array',
        ];
    }
}
