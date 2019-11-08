@extends('layouts.app')

@section('body-class', 'product-page')

@section('styles')
    <style>
        .page-header{
            min-height: 15vh !important;
            background-position: center !important;
        }


      .main {
        margin-top: 0px !important;
        padding-top: 0vh !important;
      }
        
    </style>
@endsection

@section('content')
<div class="page-header header-filter" style="background-image: url('{{ asset('img/city.jpg') }}');">
</div>

<div class="main main-raised">
    <div class="container">

        <div class="section">
            <h2 class="title text-center">Panel de compras</h2>

            @if (session('notification'))
                <div class="alert alert-success">
                    {{ session('notification') }}
                </div>
            @endif

            <ul class="nav nav-pills nav-pills-primary" role="tablist">
                <li class="active">
                    <a href="#dashboard" role="tab" data-toggle="tab">
                        <i class="material-icons">dashboard</i>
                        Carrito de compras
                    </a>
                </li>
                <li>
                    <a href="#tasks" role="tab" data-toggle="tab">
                        <i class="material-icons">list</i>
                        Pedidos realizados
                    </a>
                </li>
            </ul>
        
            <hr>
            <p>hello bitch, haz logrado entrar a mis sistema! :3 Nice! </p>

        </div>

    </div>
</div>

@include('includes.footer')
@endsection
