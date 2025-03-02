<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),
            'role' => 'tutor',
            'role_id' => \App\Models\Tutor::factory(),
            'url_pic' => $this->faker->imageUrl()
        ];
    }

    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'admin',
                'role_id' => \App\Models\Admin::factory(),
            ];
        });
    }

    public function monitor()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'monitor',
                'role_id' => \App\Models\Monitor::factory(),
            ];
        });
    }
}