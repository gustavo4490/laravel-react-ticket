<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Support>
 */
class SupportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'speciality' => $this->faker->randomElement([
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
            ]),
        ];
    }
}
