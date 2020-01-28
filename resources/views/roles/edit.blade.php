@extends('layouts.app')

@section('title', 'Bienvenido a ' . config('app.name'))

@section('body-class', 'landing-page')

@section('styles')
    <style>

        .tarjeta {
            display:flex;
            justify-content: center !important;
        }
        .card {
            padding-top: 5px;
            padding-left: 8px;
            padding-right: 8px;
            padding-bottom: 5px;
            width: 50%;
        }
        ul {
            text-align: left !important;
            padding-left:4% !important;
        }
    </style>
@endsection

@section('content')
<div class="main ">
    <div class="container">

        <div class="section">
            <br>
            <br>

            <div class="tarjeta">
            <div class="card card-nav-tabs text-center">
            {!! Form::model($role, ['route' => ['roles.update', $role->id], 'method' => 'PUT']) !!}

                @include('roles.partials.form')

                {!! Form::close() !!}
            </div>
            </div>

        </div>

    </div>
        
</div>

@include('includes.footer')
@endsection