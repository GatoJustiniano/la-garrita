<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Image;
use App\Models\Proyect;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            SettingGeneralSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            RoleHasPermissionSeeder::class,
            UserSeeder::class,
        ]);
        $this->llenadoExtra();
    }

    function llenadoExtra() {

        $leader = User::factory(5)
            ->create()
            ->each(function ($user) {
                $image = Image::factory()
                    ->user()
                    ->make();

                $user->image()->save($image);
                $user->assignRole('Jefe de grupo');
            });

        $personals = User::factory(20)
            ->create()
            ->each(function ($user) {
                $image = Image::factory()
                    ->user()
                    ->make();

                $user->image()->save($image);
                $user->assignRole('Personal');
            });
            
        

        $proyects = Proyect::factory(10)
            ->create()
            ->each(function ($proyect) use ($personals) {                
                $lider = User::find($proyect->leader_id);
                $proyect->users()->attach($lider);
                $personal = $personals->random();
                $proyect->users()->attach($personal);    
            }); 
    }
}
