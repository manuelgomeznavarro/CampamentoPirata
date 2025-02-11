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
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname');
            $table->date('birthdate');
            $table->string('t_shirt_size');
            $table->text('alergy_intolerance')->nullable();
            $table->text('aditional_info')->nullable();
            $table->string('acquaintance')->nullable();
            $table->foreignId('group_id')->nullable()->constrained('groups')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('children');
    }
};
