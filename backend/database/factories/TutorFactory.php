<?php

namespace Database\Factories;

use App\Models\Tutor;
use Illuminate\Database\Eloquent\Factories\Factory;

class TutorFactory extends Factory
{
    protected $model = Tutor::class;

    public function definition()
    {
        return [
            'name' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'dni' => $this->faker->unique()->numerify('########'),
            'phone' => $this->faker->phoneNumber,
            'phone2' => $this->faker->phoneNumber,
            'city' => $this->faker->city,
            'postal_code' => $this->faker->postcode,
        ];
    }
}