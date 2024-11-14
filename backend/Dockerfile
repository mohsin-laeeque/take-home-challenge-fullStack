# Use the official PHP image with FPM
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
    default-mysql-client \
    && docker-php-ext-install pdo_mysql gd

# Install Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Copy the application code
COPY . .

# Ensure `.env` file is available
RUN cp .env.example .env || true

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Generate application key
RUN php artisan key:generate

# Copy the wait script and make it executable
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Expose port 8000
EXPOSE 8000

# Run the wait script as the final command
CMD /wait-for-db.sh
