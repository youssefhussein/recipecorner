<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        "recipename" => fake()->name(),
        "text"=> fake()->realText(100),
        "type"=>fake()->name(),
        "user_id"=> User::inRandomOrder()->first()->id,
        ];
    }
}
