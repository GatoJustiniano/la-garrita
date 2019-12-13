<?php

use Illuminate\Database\Seeder;
use App\User;
use Caffeinated\Shinobi\Models\Role;

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

        Role::create([
        	'name'		=> 'Admin',
        	'slug'  	=> 'slug',
        	'special' 	=> 'all-access'
        ]);
    }
}
