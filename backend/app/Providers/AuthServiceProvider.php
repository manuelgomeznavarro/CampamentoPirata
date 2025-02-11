<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Artisan;
use PDO;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    public function register()
    {
        //
    }

    public function boot()
    {
        $this->checkAndCreateDatabase();
    }

    private function checkAndCreateDatabase()
    {
        try {
            $database = config('database.connections.mysql.database');
            $host = config('database.connections.mysql.host');
            $port = config('database.connections.mysql.port');
            $username = config('database.connections.mysql.username');
            $password = config('database.connections.mysql.password');

            // Connect without database selected
            $pdo = new PDO(
                "mysql:host=$host;port=$port",
                $username,
                $password
            );

            // Check if database exists
            $stmt = $pdo->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database'");
            $exists = $stmt->fetch();

            if (!$exists) {
                // Create database
                $pdo->exec("CREATE DATABASE `$database`");
                echo "Database '$database' created successfully.\n";
                
                // Reconnect to run migrations
                $pdo = null;
                Artisan::call('migrate');
            }
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage() . "\n";
        }
    }
}
