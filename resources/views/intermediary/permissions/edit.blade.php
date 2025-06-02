@extends('layouts.master', ['activePage' => 'permissions'])

@section('content')
<div class="row">
  <div class="col-md-6">
    <div class="card mb-4">
      <div class="card-body ">
        <form action="{{ route('permissions.update', $permission->id) }}" method="post" class="form-horizontal">
          @csrf
          @method('PUT')
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del permiso</label>
            <input type="text" class="form-control" name="name" value="{{ old('name', $permission->name) }}"
              autocomplete="off" autofocus>
          </div>
          <x-confirm-button>
            {{ __('Actualizar') }}
          </x-confirm-button>
        </form>

      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <a href="{{ URL::previous() }}" class="btn btn-label-secondary d-grid w-100 mb-3">
          Retroceder
        </a>
      </div>
    </div>
  </div>
</div>
@endsection