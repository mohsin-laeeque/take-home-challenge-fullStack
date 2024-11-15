<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ArticleService;

class ArticleController extends Controller
{
    protected $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index(Request $request)
    {
        $articles = $this->articleService->getFilteredArticles($request);
        return response()->json($articles);
    }

    public function sources()
    {
        $sources = $this->articleService->getDistinctSources();
        return response()->json($sources);
    }

    public function getDistinctArticleAttributes()
    {
        $attributes = $this->articleService->getDistinctAttributes();
        return response()->json($attributes);
    }
}
