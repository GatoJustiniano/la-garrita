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
            
            width: 50%;
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
                <div class="card-header card-header-primary text-capitalize">
                    Usuario {{ $user->name }}
                </div>
                <div class="card-body">
                    <h4 class="card-title">{{ $user->name }}</h4>
                    <p class="card-text">{{ $user->email }}</p>
                </div>
            </div>
            </div>

        </div>

    </div>
        
</div>

@include('includes.footer')
@endsection