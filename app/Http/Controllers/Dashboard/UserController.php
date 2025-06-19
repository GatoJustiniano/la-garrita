<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\User;
use App\Models\Image;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;

use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserPost;
use App\Http\Requests\UpdateUserPut;
use Illuminate\Support\Facades\Gate;


class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {         
        Gate::authorize('user.index');
        $users = User::orderBy('last_name','asc')->paginate(10);
        return view('dashboard/user/index',['users' => $users]);
    }

    public function listarUsuarios()
    {         
        $data_setting = view()->shared('settingGeneral');
        $users = User::all(); 
        foreach ($users as $user) {                   
            // $user->canDelete = auth()->user()->can('user.destroy');
            $user->nombres = $user->name . ' ' . $user->middle_name;
            $user->apellidos = $user->last_name . ' ' . $user->maternal_last_name;
            $user->role_name = $user->roles->pluck('name')->implode(', ') ?: 'Sin roles';
            $user->v_created_at = $user->created_at->format($data_setting->date_format . ' H:i:s');
            $user->v_updated_at = $user->updated_at->format($data_setting->date_format . ' H:i:s');
            $user->buttons = $this->generateButtons('user', $user->id);
        }       
        return DataTables::of($users)            
            ->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Gate::authorize('user.create');
        $roles = Role::all()->pluck('name', 'id');
        return view('dashboard/user/create',['user'=> new User()], compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserPost $request)
    {
        try {
            DB::beginTransaction();

            $user = User::create(
                [
                    'name' => $request['name'],
                    'middle_name' => $request['middle_name'],
                    'last_name' => $request['last_name'],
                    'maternal_last_name' => $request['maternal_last_name'],
                    'email' => $request['email'],
                    'password' => $request['password'],
                ]
            );
            $image = Image::factory()->user()->make();
            $user->image()->save($image);

            $roles = $request->input('roles', []);        
            $user->syncRoles($roles);
            DB::commit();
            return redirect()->route('user.index')->with('success', 'Usuario creado con éxito!') ;

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('status', $e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        Gate::authorize('user.show');
        return view('dashboard/user/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {        
        Gate::authorize('user.edit');
        $roles = Role::all()->pluck('name', 'id');
        $user->load('roles');
        return view('dashboard/user/edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserPut $request, User $user)
    {        
        $user->update(
            [
                'name' => $request['name'],
                'middle_name' => $request['middle_name'],
                'last_name' => $request['last_name'],
                'maternal_last_name' => $request['maternal_last_name'],
                'email' => $request['email'],
            ]
        );
        $user->syncRoles([]);
        if($request->has('roles') && !empty($request['roles'])) {
            $roles = $request['roles'];        
            foreach($roles as $role) {
                $user->assignRole($role);
            }
        }
        return redirect()->route('user.index')->with('success','Usuario actualizado con éxito!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        Gate::authorize('user.destroy');
        $user->delete();
        return redirect()->back()->with('success','Usuario eliminado con éxito!');
    }

    public function userJoin()
    {
        Gate::authorize('user.show');
        return view('dashboard/user/prueba_join');
    }
}
