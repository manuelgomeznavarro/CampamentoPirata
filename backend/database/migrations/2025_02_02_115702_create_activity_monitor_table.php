<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('activity_monitor', function (Blueprint $table) {
            $table->foreignId('activity_id')->constrained();
            $table->foreignId('monitor_id')->constrained();
            $table->primary(['activity_id', 'monitor_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_monitor');
    }
};
