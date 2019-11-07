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
        .team .row .col-md-4 {
            margin-bottom: 5em;
        }
        .team .row {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display:         flex;
          flex-wrap: wrap;
        }
        .team .row > [class*='col-'] {
          display: flex;
          flex-direction: column;
        }

        .tt-query {
          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
             -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        }

        .tt-hint {
          color: #999
        }

        .tt-menu {    /* used to be tt-dropdown-menu in older versions */
          width: 222px;
          margin-top: 4px;
          padding: 4px 0;
          background-color: #fff;
          border: 1px solid #ccc;
          border: 1px solid rgba(0, 0, 0, 0.2);
          -webkit-border-radius: 4px;
             -moz-border-radius: 4px;
                  border-radius: 4px;
          -webkit-box-shadow: 0 5px 10px rgba(0,0,0,.2);
             -moz-box-shadow: 0 5px 10px rgba(0,0,0,.2);
                  box-shadow: 0 5px 10px rgba(0,0,0,.2);
        }

        .tt-suggestion {
          padding: 3px 20px;
          line-height: 24px;
        }

        .tt-suggestion.tt-cursor,.tt-suggestion:hover {
          color: #fff;
          background-color: #0097cf;

        }

        .tt-suggestion p {
          margin: 0;
        }
    </style>
@endsection

@section('content')
<div class="page-header header-filter" style="background-image: url('{{ asset('/img/profile_city.jpg') }}');">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="{{ asset('/img/logo.png') }}" alt="Eventos La Garrita" width="100">
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
        <div class="section text-center section-landing">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
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

    </div>
</div>

@include('includes.footer')
@endsection
