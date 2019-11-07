<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Andres',
            'email' => 'andres@gmail.com',
            'password' => bcrypt('admin5095')
        ]);
    }
}
