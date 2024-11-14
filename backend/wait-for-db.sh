# wait-for-db.sh
#!/bin/bash
until mysqladmin ping -h db --silent; do
  echo "Waiting for database..."
  sleep 5
done

php artisan migrate
php artisan app:scrape-news
php artisan serve --host=0.0.0.0 --port=8000
