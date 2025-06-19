<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Image;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Alvaro',
            'middle_name' => 'Andres',
            'last_name' => 'Justiniano',
            'maternal_last_name' => 'Herrera',
            'email' => 'andres@gmail.com',
            'password' => 'admin5095',
        ]);

        $user->assignRole('Administrador');
        $image = Image::factory()
                    ->user()
                    ->make();

        $user->image()->save($image);
    }
}
