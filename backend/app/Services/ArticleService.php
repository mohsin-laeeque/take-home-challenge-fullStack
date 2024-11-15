<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Cache;

class ArticleService
{
    public function getFilteredArticles($request)
    {
        $query = Article::query();

        if ($request->filled('keyword')) {
            $query->where('title', 'like', '%' . $request->get('keyword') . '%');
        }

        if ($request->filled('date')) {
            $query->whereDate('published_at', $request->get('date'));
        }

        if ($request->filled('source')) {
            $query->where('source', $request->get('source'));
        }

        return $query->paginate(12);
    }

    public function getDistinctSources()
    {
        return Cache::remember('distinct_sources', 3600, function () {
            return Article::distinct()->pluck('source');
        });
    }

    public function getDistinctAttributes()
    {
        return [
            'authors' => Article::distinct()->pluck('author'),
            'sources' => Article::distinct()->pluck('source'),
        ];
    }
}
