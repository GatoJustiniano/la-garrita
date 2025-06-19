@extends('layouts.master', ['activePage' => 'roles'])
@section('title', 'Detalles del Rol '.$role->name )

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row invoice-preview">
        <!-- Tarjeja de presentación -->
        <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4">
            <div class="card invoice-preview-card">
                <div class="card-body">
                    <div class="d-flex justify-content-between flex-xl-row flex-md-column flex-sm-row flex-column p-sm-3 p-0">
                        <div class="col-5 mb-xl-0 mb-4">
                            <h2>Rol: {{ $role->name }}</h2>
                            <p class="mb-1">
                                <span class="me-1 fw-bold">Tipo guard:</span>
                                <span>{{$role->guard_name}}</span>
                            </p>
                            <p class="mb-2">
                                <span class="me-1 fw-bold">Usuarios:</span>
                                @forelse ($role->users as $user)
                                <span class="badge rounded-pill bg-label-info">{{ $user->name }}</span>
                                @empty
                                <span class="badge badge-danger bg-danger">Sin Usuarios</span>
                                @endforelse
                            </p>
                            <p class="mb-2">
                                <span class="me-1 fw-bold">Cantidad de permisos:</span>
                                <span> {{$role->permissions->count()}} </span>
                            </p>
                            <p class="mb-2">
                                <span class="me-1 fw-bold">Fecha de Creación:</span>
                                <span class="">{{ $role->created_at->format($settingGeneral->date_format . ' H:i:s') }}</span>
                            </p>
                            <p>
                                <span class="me-1 fw-bold">Fecha de Actualización:</span>
                                <span class="">{{$role->updated_at->format($settingGeneral->date_format . ' H:i:s')}} </span>
                            </p>
                        </div>
                        <div class="ms-2">
                            <h4>Permisos:</h4>
                            <div>
                                @forelse ($role->permissions->sortBy('name') as $permission)
                                <span class="badge rounded-pill bg-label-info">{{ $permission->name }}</span>
                                @empty
                                <span class="badge badge-danger bg-danger">Sin Permisos</span>
                                @endforelse
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-0" />
                <div class="card-body">

                </div>
            </div>
        </div>
        <!-- /Tarjeja de presentación -->

        <!-- Barra de Botones Derecho -->
        <div class="col-xl-3 col-md-4 col-12 invoice-actions">
            <div class="card">
                <div class="card-body">
                    <a href="{{ URL::previous() }}" class="btn btn-label-secondary d-grid w-100 mb-3">
                        Retroceder
                    </a>
                    @can('roles.edit')
                    <a href="{{ route('roles.edit',$role->id) }}" class="btn btn-label-secondary d-grid w-100 mb-3">
                        Editar
                    </a>
                    @endcan
                </div>
            </div>
        </div>
        <!-- /Barra de Botones Derecho -->
    </div>
</div>
@endsection