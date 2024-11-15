<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\UserPreferenceController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index']);
        Route::get('/sources', [ArticleController::class, 'sources']);
        Route::get('/attributes', [ArticleController::class, 'getDistinctArticleAttributes']);
    });

    Route::prefix('user')->group(function () {
        Route::get('/preferences', [UserPreferenceController::class, 'getPreferences']);
        Route::post('/preferences', [UserPreferenceController::class, 'updatePreferences']);
    });

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
