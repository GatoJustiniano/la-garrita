@extends('layouts.master', ['activePage' => 'permissions'])
@section('title', 'Detalles del Permiso '.$permission->name )

@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <div class="row invoice-preview">
    <!-- Tarjeja de presentación -->
    <div class="col-xl-8 col-md-8 col-12 mb-md-0 mb-4">
      <div class="card invoice-preview-card">
        <div class="card-body">
          <div class="d-flex justify-content-between flex-xl-row flex-md-column flex-sm-row flex-column p-sm-3 p-0">
            <div class="mb-xl-0 mb-4">
              <h2>Nombre: {{ $permission->name }}</h2>
              <p class="mb-1">
                <span class="me-1 fw-bold">Tipo guard:</span>
                <span>{{$permission->guard_name}}</span>
              </p>
              <p class="mb-2">
                <span class="me-1 fw-bold">Fecha de Creación:</span>
                <span class="">{{ $permission->created_at->format($settingGeneral->date_format . ' H:i:s') }}</span>
              </p>
              <p>
                <span class="me-1 fw-bold">Fecha de Actualización:</span>
                <span class="">{{$permission->updated_at->format($settingGeneral->date_format . ' H:i:s')}} </span>
              </p>
            </div>
          </div>
        </div>
        <hr class="my-0" />
      </div>
    </div>
    <!-- /Tarjeja de presentación -->

    <!-- Barra de Botones Derecho -->
    <div class="col-xl-4 col-md-4 col-12 invoice-actions">
      <div class="card">
        <div class="card-body">
          <a href="{{ URL::previous() }}" class="btn btn-label-secondary d-grid w-100 mb-3">
            Retroceder
          </a>
          @can('permissions.edit')
          <a href="{{ route('permissions.edit',$permission->id) }}" class="btn btn-label-secondary d-grid w-100 mb-3">
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