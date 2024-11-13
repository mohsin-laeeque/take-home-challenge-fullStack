# Use the official PHP image with FPM (FastCGI Process Manager)
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql gd

# Install Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Copy the existing application directory contents
COPY . .

# Install PHP dependencies
RUN composer install

# Copy environment variables
COPY .env.example .env

# Generate application key
RUN php artisan key:generate

# Expose port 8000 for php artisan serve
EXPOSE 8000

# Start the Laravel server when the container starts
CMD php artisan serve --host=0.0.0.0 --port=8000
