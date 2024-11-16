<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class ScrapeNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:scrape-news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news articles from multiple sources';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->fetchNewsFromNewsAPI();
        $this->fetchNewsFromGuardian();
        $this->fetchNewsFromNYTimes();

        $this->info('All news sources have been scraped and saved successfully!');
        return 0;
    }

    private function fetchNewsFromNewsAPI()
    {
        $apiKey = env('NEWS_API_KEY');
        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'apiKey' => $apiKey,
            'country' => 'us', // adjust as needed
            'category' => 'technology', // adjust as needed
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch news from NewsAPI');
            return;
        }

        $this->saveArticles($response->json()['articles'], 'NewsAPI');
    }

    private function fetchNewsFromGuardian()
    {
        $apiKey = env('GUARDIAN_API_KEY');
        $response = Http::get('https://content.guardianapis.com/search', [
            'api-key' => $apiKey,
            'section' => 'technology', // adjust as needed
            'show-fields' => 'headline,body,byline,publication',
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch news from The Guardian');
            return;
        }

        $articles = collect($response->json()['response']['results'])->map(function ($article) {
            return [
                'title' => $article['webTitle'],
                'content' => $article['fields']['body'] ?? 'No content available',
                'author' => $article['fields']['byline'] ?? 'Unknown',
                'source' => 'The Guardian',
                'publishedAt' => $article['webPublicationDate'],
            ];
        });

        $this->saveArticles($articles, 'The Guardian');
    }

    private function fetchNewsFromNYTimes()
    {
        $apiKey = env('NYTIMES_API_KEY');
        $response = Http::get('https://api.nytimes.com/svc/topstories/v2/technology.json', [
            'api-key' => $apiKey,
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch news from New York Times');
            return;
        }

        $articles = $response->json()['results'];
        $this->saveArticles($articles, 'New York Times');
    }

    /**
     * Save articles to the database.
     */
    private function saveArticles($articles, $sourceName)
    {
        foreach ($articles as $article) {
            Article::updateOrCreate(
                ['title' => $article['title']],
                [
                    'content' => $article['description'] ?? $article['content'] ?? 'No content available',
                    'author' => $article['author'] ?? 'Unknown',
                    'source' => $sourceName,
                    'published_at' => isset($article['publishedAt']) ? Carbon::parse($article['publishedAt'])->format('Y-m-d H:i:s') : now(),
                ]
            );
        }

        $this->info("News articles from {$sourceName} saved successfully!");
    }
}
