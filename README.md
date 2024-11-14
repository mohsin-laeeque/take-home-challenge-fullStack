Take-Home Challenge FullStack

This is a full-stack web application built with Laravel (backend) and React (frontend). It aggregates news from various sources and provides features like user authentication, personalized news feeds, and search/filter functionalities.
Prerequisites

Docker and Docker Compose
Node.js and npm (if running the React frontend outside Docker)
Composer (if running the Laravel backend outside Docker)

Project Structure

Backend (Laravel): API for user authentication, article retrieval, and preferences
Frontend (React): UI for login, registration, news display, and preferences

Setup and Run
1. Clone the Repository

    ```
    git clone https://github.com/mohsin-laeeque/Take-Home-Challenge-FullStack.git
    cd Take-Home-Challenge-FullStack
    ```

2. Set Up the Backend (Laravel)


3 Build and Run Containers (docker must be running on your machine)

    ```
    docker-compose up --build -d
    ```

Laravel (backend): http://localhost:8000
React (frontend): http://localhost:3000
MySQL: localhost:3307
phpMyAdmin: http://localhost:8080

4 Default user is seeded 

email: mohsin@test.com
password: mohsin123