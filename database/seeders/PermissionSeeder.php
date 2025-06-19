<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // spatie documentation
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        $permissionss = [
            'permissions.index',
            'permissions.create',
            'permissions.show',
            'permissions.edit',
            'permissions.destroy',

            'roles.index',
            'roles.create',
            'roles.show',
            'roles.edit',
            'roles.destroy',

            'user.index',
            'user.create',
            'user.show',
            'user.edit',
            'user.destroy',
            
            'setting',
            
            'proyect.index',
            'proyect.create',
            'proyect.show',
            'proyect.edit',
            'proyect.destroy',
            
            'proyect.board',
        ];

        foreach ($permissionss as $permissions) {
            Permission::create([
                'name' => $permissions
            ]);
        }
    }
}
