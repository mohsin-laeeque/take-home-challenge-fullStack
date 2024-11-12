News Aggregator Project

This project is a full-stack web application built with Laravel (backend) and React (frontend). It aggregates news from various sources and provides user authentication, personalized news feeds, and search/filter functionalities.
Prerequisites

    Docker and Docker Compose installed on your system.
    Node.js and npm (if running the React frontend outside of Docker).
    Composer (if running the Laravel backend outside of Docker).

Project Structure

    Backend (Laravel): Provides the API for user authentication, article retrieval, and user preferences.
    Frontend (React): Handles the UI for login, registration, news display, and user preferences.

Setup and Run the Project
1. Clone the Repository

git clone https://github.com/your-username/news-aggregator.git
cd news-aggregator

2. Set Up the Backend (Laravel)
Step 2.1: Configure Environment

Copy the .env.example file and update environment variables:

cp .env.example .env

Update these settings in .env:

    DB_CONNECTION: mysql
    DB_HOST: db (since it's running in Docker)
    DB_PORT: 3306
    DB_DATABASE: task
    DB_USERNAME: root
    DB_PASSWORD: root
    API_KEY: (Add your news API key if needed for data scraping)

Step 2.2: Build and Run Docker Containers

Use Docker Compose to build and start the containers.

docker-compose up --build

This will start:

    Laravel (backend) on port 8000
    React (frontend) on port 3000
    MySQL database on port 3307
    phpMyAdmin on port 8080

Step 2.3: Run Migrations and Seeders

Run the following commands in the Laravel container to set up the database:

docker-compose exec laravel-app php artisan migrate
docker-compose exec laravel-app php artisan db:seed

3. Set Up the Frontend (React)
Step 3.1: Configure Environment Variables

If you need to customize the frontend environment, create a .env file in the frontend directory with the following content:

REACT_APP_API_URL=http://localhost:8000/api

Step 3.2: Run the React App

If you are running React within Docker, it should already be available on http://localhost:3000. If you prefer running it manually, navigate to the frontend folder and run:

cd frontend
npm install
npm start

4. Access the Application

    Laravel Backend: http://localhost:8000
    React Frontend: http://localhost:3000
    phpMyAdmin: http://localhost:8080

5. API Endpoints

    POST /api/register: Register a new user.
    POST /api/login: Log in with an existing user.
    GET /api/articles: Fetch articles with search and filter options.

6. Additional Commands

    Clear Laravel Cache:

docker-compose exec laravel-app php artisan optimize:clear

Run Laravel Scheduler:

Add a cron job on the host to run the Laravel scheduler every minute, or set up a dedicated container for the scheduler if needed.
