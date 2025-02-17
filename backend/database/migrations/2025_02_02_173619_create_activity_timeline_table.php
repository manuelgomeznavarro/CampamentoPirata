<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activity_timeline', function (Blueprint $table) {
            $table->foreignId('activity_id')->constrained()->onDelete('cascade');
            $table->foreignId('timeline_id')->constrained()->onDelete('cascade');
            $table->dateTime('date_hour');
            $table->integer('duration');
            $table->primary(['activity_id', 'timeline_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_timeline');
    }
};
