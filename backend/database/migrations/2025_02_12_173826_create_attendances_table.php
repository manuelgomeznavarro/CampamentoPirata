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
        Schema::create('attendances', function (Blueprint $table) {
            $table->foreignId('child_id')->constrained('children')->onDelete('cascade');
            $table->foreignId('timeline_id')->constrained('timelines')->onDelete('cascade');
            $table->date('date');
            $table->boolean('attendance'); // true = presente, false = ausente
            $table->primary(['child_id', 'timeline_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
