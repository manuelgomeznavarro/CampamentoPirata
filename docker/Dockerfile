# Utilizar la imagen base de PHP con FPM
FROM php:8.4.3-fpm

# Instalar dependencias para MongoDB y otras librerías necesarias
RUN apt-get update && apt-get install -y \
    libssl-dev \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \
    libicu-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    git \
    curl \
    zip \
    unzip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && docker-php-ext-install pdo pdo_mysql \
    && rm -r /var/lib/apt/lists/*

    # Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install MongoDB extension
RUN docker-php-ext-enable mongodb

# Copiar el archivo composer.phar al contenedor
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /var/www/html

# Create system user
RUN useradd -G www-data,root -u 1000 -d /home/dev dev
RUN mkdir -p /home/dev/.composer && \
    chown -R dev:dev /home/dev

# Switch to dev user
USER dev

# Pre-install MongoDB Laravel package globally
RUN composer global require jenssegers/mongodb

# Copy composer files if they exist
# COPY --chown=dev:dev backend/composer.json backend/composer.lock* ./

# Install project dependencies if composer.json exists
RUN if [ -f "composer.json" ]; then \
        composer install --prefer-dist --no-scripts --no-dev --no-autoloader && \
        composer dump-autoload --no-scripts --no-dev --optimize; \
    fi

# Exponer el puerto donde estará el servidor (comúnmente 9000 para PHP-FPM)
EXPOSE 9000

# Comando para iniciar el servicio de PHP-FPM
CMD ["php-fpm"]
