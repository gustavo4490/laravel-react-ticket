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
        Schema::create('supports', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->enum('speciality', [
                'Software Support',
                'Technical Support',
                'Customer Service',
                'Sales Support',
                'Billing Support',
                'Product Support',
                'Technical Account Manager',
                'Field Service Engineer',
                'Help Desk Technician',
                'IT Support Specialist',
                'Network Support Technician'
            ])->default('Software Support');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supports');
    }
};
