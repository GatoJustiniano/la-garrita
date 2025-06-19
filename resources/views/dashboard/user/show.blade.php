@extends('layouts.master', ['activePage' => 'users'])
@section('title', 'Detalles del Usuario '.$user->last_name )

@section('content')

@include('layouts.partials.validation-error')
<div class="container-xxl flex-grow-1 container-p-y">

    <div class="row">
        <!-- User Sidebar -->
        <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
            <!-- User Card -->
            <div class="card mb-4">
                <div class="card-body">
                    <div class="user-avatar-section">
                        <div class=" d-flex align-items-center flex-column">                            
                            <img class="img-fluid rounded my-4" src="{{ ($user->image ? asset($user->image->path) : '') ?? '' }}"
                                height="110" width="110" alt="Imagen de user {{$user->id}}" />
                            <div class="user-info text-center">
                                <h4 class="mb-2">{{ $user->name }}</h4>
                                @forelse ($user->roles as $role)
                                <span class="badge bg-label-secondary">{{ $role->name }}</span>
                                @empty
                                <span>Sin roles</span>
                                @endforelse
                            </div>
                        </div>
                    </div>

                    <h5 class="pb-2 border-bottom mb-2">Datos</h5>
                    <div class="info-container">
                        <ul class="list-unstyled">
                            <li class="mb-3">
                                <span class="fw-bold me-2">Nombres:</span>
                                <span>{{ $user->name . ' ' . $user->middle_name }}</span>
                            </li>
                            <li class="mb-3">
                                <span class="fw-bold me-2">Apellidos:</span>
                                <span>{{ $user->last_name . ' ' . $user->maternal_last_name }}</span>
                            </li>
                            <li class="mb-3">
                                <span class="fw-bold me-2">Correo Electrónico:</span>
                                <span>{{ $user->email }}</span>
                            </li>
                            <li class="mb-3">
                                <span class="fw-bold me-2">Roles:</span>
                                @forelse ($user->roles as $role)
                                <span>{{ $role->name }}</span>
                                @empty
                                <span>Sin roles</span>
                                @endforelse
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center pt-3">
                            @can('user.edit')
                            <a href="{{ route('user.edit',$user->id) }}" class="btn btn-label-primary me-3">
                                Editar
                            </a>
                            @endcan
                            @can('roles.index')
                            <a href="{{ route('roles.index') }}" class="btn btn-label-danger">
                                Administrar roles
                            </a>
                            @endcan
                        </div>
                    </div>
                </div>
            </div>
            <!-- /User Card -->
        </div>
        <!--/ User Sidebar -->


        <!-- User Content -->
        <div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
            <!-- User Pills -->
            <ul class="nav nav-pills flex-column flex-md-row mb-3">
                <li class="nav-item">
                    <button class="nav-link active" id="pills-primer-tab" type="button" data-bs-toggle="pill"
                        data-bs-target="#pills-primer" role="tab" aria-controls="pills-primer" aria-selected="true">
                        <i class="bx bx-user me-1"></i> Cuenta
                    </button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" id="pills-segundo-tab" type="button" data-bs-toggle="pill"
                        data-bs-target="#pills-segundo" role="tab" aria-controls="pills-segundo" aria-selected="true">
                        <i class="bx bx-lock-alt me-1"></i> Seguridad
                    </button>
                </li>
            </ul>
            <!--/ User Pills -->

            <div class="tab-content p-0" id="myTabContent">
                <!-- tabPrimer -->
                <div class="tab-pane fade show active" id="pills-primer" role="tabpanel"
                    aria-labelledby="pills-primer-tab">
                    <!-- Project table -->
                    <div class="card mb-4">
                        <h5 class="card-header">Lista de proyectos</h5>
                        <div class="table-responsive mb-3">
                            <table class="table datatable-project border-top">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Proyecto</th>
                                        <th>Descripción</th>
                                        <th>Líder</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($user->proyects as $proyect)
                                    <tr>
                                        <td>
                                            <a href="{{ route('proyect.show',$proyect->id) }}"
                                                class="btn btn-outline-secondary btn-sm btn-icon ">
                                                <i class="material-icons">visibility</i>
                                            </a>
                                        </td>
                                        <td>{{ $proyect->name }}</td>                                
                                        <td>{{ $proyect->description }}</td>                                
                                        <td>{{ $proyect->leader->fullName }}</td>                                
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- /tabPrimer -->

                <!-- tabSegundo -->
                <div class="tab-pane fade" id="pills-segundo" role="tabpanel" aria-labelledby="pills-segundo-tab">
                    <div class="card mb-4">
                        <h5 class="card-header">Lista de dispositivos</h5>
                        <div class="table-responsive mb-3">
                            <table class="table datatable-invoice border-top">
                                <thead>
                                    <tr>
                                        <th>Navegador/Dispositivo</th>
                                        <th>Hora inicio</th>
                                        <th>sesión exitoso?</th>
                                        <th>Hora final</th>
                                        <th><i class='bx bx-trending-up'> IP</i></th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {{-- @foreach ($user->authentications as $item)
                                    <tr>
                                        <td>{{ $item->user_agent }}</td>                               
                                        <td>{{ $item->login_at ? $item->login_at->format($settingGeneral->date_format . ' H:i:s') : '' }}</td>                               
                                        <td>
                                            @if ($item->login_successful)
                                            Yes
                                            @else
                                            not
                                            @endif
                                        </td>                               
                                        <td>{{ $item->logout_at ? $item->logout_at->format($settingGeneral->date_format . ' H:i:s') : '-' }}</td>
                                        <td>{{ $item->ip_address }}</td>                               
                                        <td>-</td>                               
                                    </tr>
                                    @endforeach --}}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- /tabSegundo -->
            </div>


        </div>
        <!--/ User Content -->
    </div>

</div>
@endsection