@extends('layouts.master', ['activePage' => 'users'])
@section('title', 'Detalles de usuarios en linea' )

@section('content')

@include('layouts.partials.validation-error')
<div class="container-xxl flex-grow-1 container-p-y">

    <div class="row">
        <h1>prueba y error</h1>
    </div>
    <div class="p-6 text-gray-900"
        x-data="{usersHere:[]}"
        x-init="
            Echo.join('room.1')
                .here((users) => {
                    usersHere = users
                })
                .joining((user) => {
                    console.log(user.name);
                })
                .leaving((user) => {
                    console.log(user.name);
                })
                .error((error) => {
                    console.error(error);
                })
        "
    >
    <div>
        <h2 class="text-lg">User here</h2>
        <template x-for="user in usersHere">
            <div x-text="user.name"></div>

        </template>
    </div>

    </div>

</div>
@endsection