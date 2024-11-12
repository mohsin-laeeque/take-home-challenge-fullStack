<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();

        if ($request->has('keyword') && $request->get('keyword') != null) {
            $query->where('title', 'like', '%' . $request->keyword . '%');
        }

        if ($request->has('date') && $request->get('date') != null) {
            $query->whereDate('published_at', $request->date);
        }

        if ($request->has('source') && $request->get('source') != null) {
            $query->where('source', $request->source);
        }

        $articles = $query->paginate(10);

        return response()->json($articles);
    }
}
