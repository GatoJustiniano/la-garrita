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
            'name'      => 'Andres',
            'email'     => 'andres@gmail.com',
            'password'  => bcrypt('admin5095'),
            'phone'     => '33331212',
            'address'   => 'Barrio La fabela',
            'username'  => 'El Andres'
        ]);

        User::create([
            'name' => 'Alvaro',
            'email' => 'gato@gmail.com',
            'password' => bcrypt('gato5095'),
            'phone'     => '700021000',
            'address'   => 'Barrio La Joda',
            'username'  => 'Gato'
        ]);

        Role::create([
        	'name'		    => 'Admin',
            'slug'  	    => 'admin',
            'description'   => 'Rol de administrador del sistema',
        	'special' 	    => 'all-access'
        ]);

        Role::create([
        	'name'		    => 'Secretaria',
            'slug'  	    => 'secretary',
            'description'   => 'Acceso de tipo secretaria'
        ]);
    }
}
