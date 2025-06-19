<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fileName = $this->faker->numberBetween(1, 10) . '.jpg';

        return [
            'path' => "img/products/{$fileName}"
        ];
    }

    public function user()
    {
        $fileName = $this->faker->numberBetween(1, 6) . '.png';

        return $this->state([
            'path' => "img/users/{$fileName}"
        ]);
    }
}
