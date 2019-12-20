@extends('layouts.app')

@section('title', 'Bienvenido a ' . config('app.name'))

@section('body-class', 'landing-page')

@section('styles')
    <style>
        h1.title {
            font-size: 3rem;
        }
        div.section.section-contacts {
            background-color: #efffff;
            border: 1px solid transparent;
            border-radius: 18%;
        }
    </style>
@endsection

@section('content')
<div class="main main-raised">
    <div class="container">

        <div class="section text-center">
            <h2 class="title">Productos disponibles</h2>
            <div class="team">
                <div class="row">
                    @foreach ($products as $product)
                    <div class="col-md-4">
                        <div class="team-player">
                            <div class="card card-plain">
                            <div class="col-md-6 ml-auto mr-auto">
                                <img src="../asset/img/faces/avatar.jpg" alt="Thumbnail Image" class="img-raised rounded-circle img-fluid">
                            </div>
                            <h4 class="card-title">{{$product->name}}
                                <br>
                                <small class="card-description text-muted">Model</small>
                            </h4>
                            <div class="card-body">
                                <p class="card-description">{{$product->description}}
                                <a href="#">links</a> for people to be able to follow them outside the site.</p>
                            </div>
                            <div class="card-footer justify-content-center">
                                <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-twitter"></i></a>
                                <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-instagram"></i></a>
                                <a href="#pablo" class="btn btn-link btn-just-icon"><i class="fa fa-facebook-square"></i></a>
                            </div>
                            </div>
                        </div>
                    </div>                
                    @endforeach
                </div>
            </div>

        </div>

    </div>
        
</div>

@include('includes.footer')
@endsection
