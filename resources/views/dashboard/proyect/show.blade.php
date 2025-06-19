@extends('layouts.master', ['activePage' => 'proyects'])
@section('title', 'Detalles del Proyecto '. $proyect->name )

@section('content')

@include('layouts.partials.validation-error')
<div class="container-xxl flex-grow-1 container-p-y">

    <div class="row">
        <!-- proyect Sidebar -->
        <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
            <!-- proyect Card -->
            <div class="card mb-4">
                <div class="card-body">                 
                    <h5 class="pb-2 border-bottom mb-2">Datos del Proyecto</h5>
                    <div class="info-container">
                        <ul class="list-unstyled">
                            <li class="mb-3">
                                <span class="fw-bold me-2">Nombre:</span>
                                <span>{{ $proyect->name }}</span>
                            </li>
                            <li class="mb-3">
                                <span class="fw-bold me-2">Descripción:</span>
                                <span>{{ $proyect->description }}</span>
                            </li>
                            <li class="mb-3">
                                <span class="fw-bold me-2">Lider:</span>
                                <span>{{ $proyect->leader->fullName }}</span>
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center pt-3">
                            @can('proyect.edit')
                            <a href="{{ route('proyect.edit', $proyect->id) }}" class="btn btn-label-primary me-3">
                                Editar
                            </a>
                            @endcan
                            @can('proyect.board')
                            <a href="{{ route('proyect.board', $proyect->id) }}" class="btn btn-label-info">
                                Ir a pizarra
                            </a>
                            @endcan
                        </div>
                    </div>
                </div>
            </div>
            <!-- /proyect Card -->
        </div>
        <!--/ proyect Sidebar -->   
        
        <div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
            <!-- table -->
            <div class="card mb-4">
                <h5 class="card-header">Lista de participantes</h5>
                <div class="table-responsive mb-3">
                    <table class="table datatable-project border-top">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Tipo</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($proyect->users as $personal)
                            <tr>
                                <td>{{ $personal->id }}</td>
                                <td>{{ $personal->fullName }}</td>                                
                                <td>{{ $personal->email }}</td>                                
                                <td>
                                    @forelse ($personal->roles as $role)
                                    <span>{{ $role->name }}</span>
                                    @empty
                                    <span>Sin roles</span>
                                    @endforelse
                                </td>                                
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</div>
@endsection