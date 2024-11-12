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
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = env('NEWS_API_KEY');
        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'apiKey' => $apiKey,
            'country' => 'us', // adjust as needed
            'category' => 'technology', // adjust as needed
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch news data.');
            return 1;
        }

        $articles = $response->json()['articles'];

        foreach ($articles as $article) {
            Article::updateOrCreate(
                ['title' => $article['title']],
                [
                    'content' => $article['description'] ?? 'No content available',
                    'author' => $article['author'],
                    'source' => $article['source']['name'],
                    'published_at' => Carbon::parse($article['publishedAt'])->format('Y-m-d H:i:s'),
                ]
            );
        }

        $this->info('News articles scraped and saved successfully!');
        return 0;
    }
}
