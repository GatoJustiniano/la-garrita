@extends('layouts.master', ['activePage' => 'proyects'])
@section('title', 'Listado de Proyectos')

@section('content')

<div class="card">
    <div
        class="card-header sticky-element bg-label-secondary d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row">
        <h5 class="card-title mb-sm-0 me-2">Listado de Proyectos</h5>
        <div class="action-btns">
            <a class="btn btn-label-info me-3" href="{{ URL::previous() }}">
                Retroceder
            </a>
            @can('proyect.create')
            <a class="btn btn-label-success " href="{{ route('proyect.create') }}">
                Crear
            </a>
            @endcan
        </div>
    </div>
    <div class="card-body">
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Proyecto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Líder</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($proyects as $proyect)
                    <tr>
                        <td>{{ $proyect->id }}</td>
                        <td>{{ $proyect->name }}</td>
                        <td>{{ Illuminate\Support\Str::limit($proyect->description, 20) }}</td>                        
                        
                        <td>{{ $proyect->leader->fullName }}</td>

                        <td class="text-primary">{{ $proyect->created_at->format($settingGeneral->date_format . ' H:i:s') }}</td>
                        <td class="text-primary">{{ $proyect->updated_at->format($settingGeneral->date_format . ' H:i:s') }}</td>
                        <td>
                            <div class="d-inline-block text-nowrap">
                                @can('proyect.show')
                                <a href="{{ route('proyect.show',$proyect->id) }}"
                                    class="btn btn-outline-secondary btn-sm btn-icon ">
                                    <i class="material-icons">visibility</i>
                                </a>
                                @endcan
                                @can('proyect.edit')
                                <a href="{{ route('proyect.edit',$proyect->id) }}"
                                    class="btn btn-outline-secondary btn-sm btn-icon ">
                                    <i class="material-icons">edit</i>
                                </a>
                                @endcan

                                @can('proyect.destroy')
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-icon "
                                    data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="{{ $proyect->id }}"
                                    data-info="{{ $proyect->name }}">
                                    <i class="material-icons">delete</i>
                                </button>
                                @endcan
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-footer py-0">
        {{ $proyects->links() }}
    </div>

</div>


<div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <h2>Ingresar datos del proyect. </h2>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
                <p>Seguro que deseas eliminar el proyecto seleccionado?</p>
            </div>
            <div class="modal-footer">
                <form id="formDelete" action="{{ route('proyect.destroy',0) }}" method="POST"
                    data-action="{{ route('proyect.destroy',0) }}">
                    @method('DELETE')
                    @csrf
                    <button type="submit" class="btn btn-danger">Borrar</button>
                </form>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script>
    window.onload = function () {

        $('#deleteModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) 
            var id = button.data('id') 
            var info = button.data('info') 
            action = $('#formDelete').attr('data-action').slice(0,-1)
            $('#formDelete').attr('action',action + id )
            var modal = $(this)
            modal.find('.modal-title').text('Vas a borrar el Proyecto: ' + info + ' con Id:' + id)
        });
    
    };

</script>

@endsection