<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $databaseName = Config::get('database.connections.mysql.database');

        try {
            DB::statement("CREATE DATABASE IF NOT EXISTS $databaseName");
            Config::set('database.connections.mysql.database', $databaseName);
            DB::reconnect();

            Artisan::call('migrate');
        } catch (\Exception $e) {
            die("Error creating database: " . $e->getMessage());
        }        
    }
}

