@extends('layouts.master', ['activePage' => 'roles'])
@section('title', 'Listado de Roles')

@section('content')
<div class="row">    
    <div class="row col-md-12 mb-3">
        @forelse ($roles as $role)
        <div class="col-xl-4 col-lg-6 col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h6 class="fw-normal">Total {{ $role->cant_user }} usuarios</h6>              
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                        <div class="role-heading">
                            <h4 class="mb-1">{{ $role->name }}</h4>                            
                        </div>
                        @can('roles.edit')
                            <a href="{{ route('roles.edit',$role->id) }}"
                                class="text-muted btn-icon ">
                                <i class="material-icons">edit</i>
                            </a>
                        @endcan                        
                    </div>
                </div>
            </div>
        </div>
        @empty
        <tr>
            <h4>Sin registros.</h4>
        </tr>
        @endforelse
    </div>
    <div class="col-12">
        <div class="card">
            <div
                class="card-header sticky-element bg-label-secondary d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row">
                <h5 class="card-title mb-sm-0 me-2">Listado de Roles</h5>
                <div class="action-btns">
                    <a class="btn btn-label-info me-3" href="{{ URL::previous() }}">
                        Retroceder
                    </a>
                    @can('roles.create')
                    <a class="btn btn-label-success " href="{{ route('roles.create') }}">
                        Crear
                    </a>
                    @endcan
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive ">
                    <table class="table table-sm mb-3">
                        <thead>
                            <tr>
                                <th scope="col"> # </th>
                                <th scope="col"> Nombre </th>
                                <th scope="col"> Guard </th>
                                <th scope="col"> Fecha actualización </th>
                                <th scope="col"> Permisos </th>
                                <th scope="col"> Acciones </th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($roles as $role)
                            <tr>
                                <td>{{ $role->id }}</td>
                                <td>{{ $role->name }}</td>
                                <td>{{ $role->guard_name }}</td>
                                <td class="text-primary">{{ $role->updated_at->format($settingGeneral->date_format . ' H:i:s') }}</td>
                                <td>
                                    @forelse ($role->permissions as $permission)
                                    <span class="badge rounded-pill bg-label-info">{{ $permission->name }}</span>
                                    @empty
                                    <span class="badge rounded-pill bg-label-danger">Permisos no Definidos</span>
                                    @endforelse
                                </td>
                                <td>
                                    <div class="d-inline-block text-nowrap">
                                        @can('roles.show')
                                        <a href="{{ route('roles.show',$role->id) }}"
                                            class="btn btn-outline-secondary btn-icon btn-sm">
                                            <i class="material-icons">visibility</i>
                                        </a>
                                        @endcan
                                        @can('roles.edit')
                                        <a href="{{ route('roles.edit',$role->id) }}"
                                            class="btn btn-outline-secondary btn-icon btn-sm">
                                            <i class="material-icons">edit</i>
                                        </a>
                                        @endcan
                                        @can('roles.destroy')
                                            <button type="button" class="btn btn-outline-secondary btn-icon btn-sm"
                                                data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="{{ $role->id }}">
                                                <i class="material-icons">delete</i>
                                            </button>                                    
                                        @endcan
                                    </div>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="2">Sin registros.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                    {{ $roles->links() }}

                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <p>Seguro que deseas eliminar el Rol seleccionado?</p>
            </div>
            <div class="modal-footer">
                <form id="formDelete" action="{{ route('roles.destroy',0) }}" method="POST"
                    data-action="{{ route('roles.destroy',0) }}">
                    @method('DELETE')
                    @csrf
                    <button type="submit" class="btn btn-outline-danger">Borrar</button>
                </form>
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script>
    window.onload = function () {
        $('#deleteModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var id = button.data('id');
            action = $('#formDelete').attr('data-action').slice(0,-1);
            $('#formDelete').attr('action',action + id );
            var modal = $(this);
            modal.find('.modal-title').text('Vas a borrar el Rol ' + id)            
        });
    };  
</script>

@endsection