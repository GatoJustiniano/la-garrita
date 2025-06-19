<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_if(Gate::denies('roles.index'), 403);        
        $roles = Role::paginate(5);
        foreach ($roles as $rol) {  
            $rol->cant_user = User::with('roles')->get()->filter(
                fn ($user) => $user->roles->where('name', $rol->name)->toArray()
            )->count();            
        }
        
        return view('intermediary/roles/index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies('roles.create'), 403);
        $permissions = Permission::all()->sortBy('name')->pluck('name', 'id');
        
        return view('intermediary/roles/create', compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $role = Role::create($request->only('name'));
        $role->syncPermissions($request->input('permissions', []));

        Session::flash('success', 'Rol creado exitosamente con nombre: '. $role->name);
        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        abort_if(Gate::denies('roles.show'), 403);
        $role->load('permissions');
        
        return view('intermediary/roles/show', compact('role'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        abort_if(Gate::denies('roles.edit'), 403);
        $permissions = Permission::all()->sortBy('name')->pluck('name', 'id');
        $role->load('permissions');

        return view('intermediary/roles/edit', compact('role', 'permissions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->only('name'));
        $role->syncPermissions($request->input('permissions', []));

        return redirect()->route('roles.index')->with('success', 'Permisos actualizados para el Rol '.$role->name);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        abort_if(Gate::denies('roles.destroy'), 403);       
        $role->delete();

        Session::flash('info', 'Se ha eliminado el Rol ' . $role->name);
        return redirect()->route('roles.index');
    }
}
