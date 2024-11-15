<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ArticleService;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    protected $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index(Request $request)
    {
        try {
            $articles = $this->articleService->getFilteredArticles($request);
            return response()->json($articles);

        } catch (\Exception $e) {
            Log::error('Error fetching articles: ' . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

    public function sources()
    {
        try {
            $sources = $this->articleService->getDistinctSources();
            return response()->json($sources);
        } catch (\Exception $e) {
            Log::error('Error fetching sources: ' . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

    public function getDistinctArticleAttributes()
    {
        try {
            $attributes = $this->articleService->getDistinctAttributes();
            return response()->json($attributes);
        } catch (\Exception $e) {
            Log::error('Error fetching article attributes: ' . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
