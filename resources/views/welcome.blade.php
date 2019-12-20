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
        ul.pagination {
            justify-content: center;
        }
    </style>
@endsection

@section('content')
<div class="page-header header-filter" style="background-image: url('{{ asset('/img/profile_city.jpg') }}');">
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <h1 class="title">Bienvenido a {{ config('app.name') }}.</h1>
                <h4>Quieres armar una buena peda en tu casa? La Garrita te ofrece lo necesario para tu evento social.</h4>
                <br />
                <a href="#" class="btn btn-danger btn-raised btn-lg">
                    <i class="fa fa-play"></i> ¿Cómo funciona?
                </a>
            </div>
        </div>
    </div>
</div>

<div class="main main-raised">
    <div class="container">
        <div class="section text-center ">
            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h2 class="title">¿Por qué confiar en {{ config('app.name') }}?</h2>
                    <h5 class="description">Puedes reservar nuestros servicios pagando la mitad, con confianza te atenderos en tu evento social.</h5>
                </div>
            </div>

            <div class="features">
                <div class="row">
                    <div class="col-md-4">
                        <div class="info">
                            <div class="icon icon-primary">
                                <i class="material-icons">chat</i>
                            </div>
                            <h4 class="info-title">Atendemos tus dudas</h4>
                            <p>Ante cualquier consulta que tengas, hablanos vía chat o correo electrónico. Estamos atentos a tus preguntas.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info">
                            <div class="icon icon-success">
                                <i class="material-icons">verified_user</i>
                            </div>
                            <h4 class="info-title">Pago seguro</h4>
                            <p>Todo pedido que realices será confirmado a través de una llamada y mensaje de confirmación vía mail.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="info">
                            <div class="icon icon-danger">
                                <i class="material-icons">fingerprint</i>
                            </div>
                            <h4 class="info-title">Información privada</h4>
                            <p>Los pedidos que realices sólo los conocerás tú a través de tu panel de usuario. Nadie más tiene acceso a esta información.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                {{ $products->links() }}
            </div>

        </div>

        <div class="section section-contacts">
            <div class="row">
                <div class="col-md-8 ml-auto mr-auto">
                    <h2 class="text-center title">¿No te has registrado?</h2>
                    <h4 class="text-center description">Regístrate ingresando tus datos básicos, y podrás realizar tus pedidos, nuestro carrito te ayudará a listar todos los servicios que requieras en tu evento. Ademas con tu cuenta de usuario podrás hacer todas tus consultas sin compromiso.</h4>
                    <form class="contact-form" method="get" action="{{ url('/register') }}">
                    <div class="row">
                        <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nombre</label>
                            <input type="text" class="form-control" name="name">
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Tu correo electrónico</label>
                            <input type="email" class="form-control" name="email">
                        </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="exampleMessage" class="bmd-label-floating">Tu mensaje</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-4 ml-auto mr-auto text-center">
                        <button class="btn btn-primary btn-raised">
                            Iniciar registro
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <br>
    </div>
    
</div>

@include('includes.footer')
@endsection
