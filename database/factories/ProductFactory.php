<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;


use App\Product;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name'=> $faker->word,
        'description'=> $faker->sentence(3),
        'long_description'=> $faker->text,
        'price'=> $faker->randomFloat(2,5,150)
    ];
});
