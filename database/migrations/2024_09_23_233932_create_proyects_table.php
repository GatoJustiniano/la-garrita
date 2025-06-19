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
        Schema::create('proyects', function (Blueprint $table) {
            $table->id();
            
            $table->string('name');
            $table->string('description');
            $table->longText('xml')->nullable();            
            $table->bigInteger('leader_id');

            $table->timestamps();
        });

        Schema::create('proyectables', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned();            
            $table->morphs('proyectable');

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectables');
        Schema::dropIfExists('proyects');
    }
};
