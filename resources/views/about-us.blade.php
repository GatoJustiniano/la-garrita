@extends('layouts.app')

@section('title', 'Bienvenido a ' . config('app.name'))

@section('body-class', 'about-us')

@section('styles')
    <style>
        
        
    </style>
@endsection

@section('content')
<div class="page-header header-filter header-small" data-parallax="true" style="background-image: url('{{ asset('/img/bg2.jpg') }}'); transform: translate3d(0px, 0px, 0px);">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h1 class="title">Acerca de Nosotros</h1>
          <h4>Conozca al increíble equipo detrás de este proyecto, {{config('app.name')}}.</h4>
        </div>
      </div>
    </div>
  </div>

  <div class="main main-raised">
      <div class="container">
        <div class="about-description text-center">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
              <h5 class="description">{{ config('app.name')}} es un sistema que te permite gestionar todo lo necesario para desarrollar y llevar a cabo un evento social, permitiendo listar aquellos servicios/productos que no poseas, pero que nosotros te alquilamos.</h5>
            </div>
          </div>
        </div>
        <div class="about-team team-1">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto text-center">
              <h2 class="title">Desarrolladores actuales</h2>
              <h5 class="description">Son pocos, pero la calidad salta a brillar.</h5>
            </div>
          </div>
          <div class="row">

            <div class="col-md-6">
              <div class="card card-profile card-plain">
                <div class="card-avatar">
                  <a href="#">
                    <img class="img" src="{{'/img/faces/marc.jpg'}}">
                  </a>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Andres Justiniano</h4>
                  <h6 class="category text-muted">CEO / Co-Fundador</h6>
                  <p class="card-description">
                    Programador principiante, pero con ganas de terminar la universidad.
                  </p>
                </div>
                <div class="card-footer justify-content-center">
                  <a href="#" class="btn btn-just-icon btn-link btn-twitter">
                    <i class="fa fa-twitter"></i>
                  </a>
                  <a href="https://www.facebook.com/andresalvaro.justinianoh" class="btn btn-just-icon btn-link btn-facebook">
                    <i class="fa fa-facebook-square"></i>
                  </a>
                  <a href="#" class="btn btn-just-icon btn-link btn-google">
                    <i class="fa fa-google"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card card-profile card-plain">
                <div class="card-avatar">
                  <a href="#pablo">
                    <img class="img" src="{{'/img/faces/kendall.jpg'}}">
                  </a>
                </div>
                <div class="card-body">
                  <h4 class="card-title">El Gato</h4>
                  <h6 class="category text-muted">Diseñador y crítico</h6>
                  <p class="card-description">
                    Diseñador principiante que cada vez mejora, resuelve bugs y pone otros.
                  </p>
                </div>
                <div class="card-footer justify-content-center">
                  <a href="#" class="btn btn-just-icon btn-link btn-linkedin">
                    <i class="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="about-services features-2">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto text-center">
              <h2 class="title">Eventos {{config('app.name')}}</h2>
              <h5 class="description">{{config('app.name')}} ofrece el servicio de alquiler para eventos sociales.</h5>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="info info-horizontal">
                <div class="icon icon-rose">
                  <i class="material-icons">gesture</i>
                </div>
                <div class="description">
                  <h4 class="info-title">1. Diseño</h4>
                  <p>Diseño simple e intuitivo, como para que cualquiera que no haya usado el sistema, sepa utilizar nuestros servicios.</p>
                  <a href="#">Nuestros servicios.</a>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="info info-horizontal">
                <div class="icon icon-rose">
                  <i class="material-icons">bookmarks</i>
                </div>
                <div class="description">
                  <h4 class="info-title">2. Servicios</h4>
                  <p>Disponemos de una lista de servicios para determinado eventos sociales, entre ellos están matrimonios, bautizos, reunión social, entre otros.</p>
                  <a href="#">Contactanos</a>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="info info-horizontal">
                <div class="icon icon-rose">
                  <i class="material-icons">payment</i>
                </div>
                <div class="description">
                  <h4 class="info-title">3. Pagos </h4>
                  <p>Nuestros servicios pueden ser requeridos con antelación, previa confirmación y anticipo de hasta el 40% de todo el servicio que requiera.</p>                  
                  <a href="#">Métodos de pago</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>

@include('includes.footer')
@endsection
