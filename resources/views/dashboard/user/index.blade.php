@extends('layouts.master', ['activePage' => 'users'])
@section('title', 'Listado de Usuarios')

@section('content')

<div class="card">
    <div
        class="card-header sticky-element bg-label-secondary d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row">
        <h5 class="card-title mb-sm-0 me-2">Listado de Usuarios</h5>
        <div class="action-btns">
            <a class="btn btn-label-info me-3" href="{{ URL::previous() }}">
                Retroceder
            </a>
            @can('user.create')
            <a class="btn btn-label-success " href="{{ route('user.create') }}">
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
                        <th scope="col">Apellidos</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                    <tr>
                        <td>{{ $user->last_name . ' ' . $user->maternal_last_name }}</td>
                        <td>{{ $user->name . ' ' . $user->middle_name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>
                            @forelse ($user->roles as $role)
                            <span class="badge bg-label-info">{{ $role->name }}</span>
                            @empty
                            <span class="badge bg-label-danger">Sin roles</span>
                            @endforelse
                        </td>
                        <td>{{ $user->created_at->format($settingGeneral->date_format) }}</td>
                        <td>{{ $user->updated_at->format($settingGeneral->date_format) }}</td>
                        <td>
                            <div class="d-inline-block text-nowrap">
                                @can('user.show')
                                <a href="{{ route('user.show',$user->id) }}"
                                    class="btn btn-outline-secondary btn-sm btn-icon ">
                                    <i class="material-icons">visibility</i>
                                </a>
                                @endcan
                                @can('user.edit')
                                <a href="{{ route('user.edit',$user->id) }}"
                                    class="btn btn-outline-secondary btn-sm btn-icon ">
                                    <i class="material-icons">edit</i>
                                </a>
                                @endcan

                                @can('user.destroy')
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-icon "
                                    data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="{{ $user->id }}"
                                    data-info="{{ $user->name }}">
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
        {{ $users->links() }}
    </div>

</div>
<div class="card mt-3">
    <h5 class="card-header">Data table</h5>
    <div class="card-datatable text-nowrap">
        <table id="listUsuarios" class="dt-scrollableTable table table-sm">
            <thead>
                <tr>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Creación</th>
                    <th scope="col">Actualización</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
        </table>

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
                <p>Seguro que deseas eliminar el usuario seleccionado?</p>
            </div>
            <div class="modal-footer">
                <form id="formDelete" action="{{ route('user.destroy',0) }}" method="POST"
                    data-action="{{ route('user.destroy',0) }}">
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
            var button = $(event.relatedTarget) 
            var id = button.data('id') 
            var info = button.data('info') 
            action = $('#formDelete').attr('data-action').slice(0,-1)
            $('#formDelete').attr('action',action + id )
            var modal = $(this)
            modal.find('.modal-title').text('Vas a borrar el usuario ' + info + ' con Id:' + id)
        });
        
        $('#listUsuarios').DataTable({
            "language": { "url": "{{ asset('js/bt5/libs/datatable-i18n-es-ES.json') }}" },            
            "ajax" : "{{ route('list_users') }}",
            "columns" : [                
                {data: 'apellidos'},
                {data: 'nombres'},
                {data: 'email'},
                {data: 'role_name', render: function(data) {
                    if (data === 'Sin roles') {
                        return '<span class="badge bg-label-danger">'+data+'</span>'                        
                    } else {
                        return '<span class="badge bg-label-info">'+data+'</span>'                        
                    }
                }},                
                {data: 'v_created_at'},                
                {data: 'v_updated_at'},                
                {data: null,},
            ],
            "scrollY": "300px",
            "scrollX": !0, 
            "columnDefs": [
                {
                    targets: -1,                    
                    searchable: false,
                    orderable: false,
                    render: function(row) {                        
                        let botones = $('<div />').html(row.buttons).text() + `
                            @can('user.destroy')
                                <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" 
                                    data-bs-toggle="modal" data-bs-target="#deleteModal" 
                                    data-id="${row.id}" data-info="${row.name}">
                                    <i class="material-icons">delete</i>
                                </button>                            
                            @endcan                            
                        `;
                        return botones;
                    }
                },                
            ],
        });                
    };

</script>

@endsection