<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'body' => fake()->text(50),
            'rating' => fake()->numberBetween(1, 5),
            'user_id' => User::inRandomOrder()->first()->id,
            'commentable_id' => Post::inRandomOrder()->first()->id,
            'commentable_type' => "App\Models\Post",

        ];
    }
}
