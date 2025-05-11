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
     * 
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        "recipename" => fake()->name(),
        "description"=>fake()->text(),
        "categories"=> fake()->randomElement( ["breakfast","dessert" , "lunch" , "dinner" , "vegeterian"]),
        "user_id"=> User::inRandomOrder()->first()->id,
        "ingredients" => fake()->text(50),
    ];
    }
}
