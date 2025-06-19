<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleHasPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        // Admin
        $admin_permissions = Permission::all();
        Role::findOrFail(1)->permissions()->sync($admin_permissions->pluck('id'));

        // Jefe
        $jefe_grupo = $admin_permissions->filter(function($permission) {
            return substr($permission->name, 0, 5) != 'user.' &&
                substr($permission->name, 0, 6) != 'roles.' &&
                substr($permission->name, 0, 12) != 'permissions.' &&
                substr($permission->name, 0, 7) != 'setting';
        });
        Role::findOrFail(2)->permissions()->sync($jefe_grupo);
        Role::findOrFail(2)->givePermissionTo('user.show');;

        // Personal
        $personal = [13, 17, 19, 22];
        Role::findOrFail(3)->permissions()->sync($personal);
    }
}
