@extends('layouts.app')

@section('title', 'Bienvenido a ' . config('app.name'))

@section('body-class', 'landing-page')

@section('styles')
    <style>
        
        
    </style>
@endsection

@section('content')
<div class="page-header header-filter header-small" data-parallax="true" style="background-image: url('{{ asset('/img/profile_city.jpg') }}'); transform: translate3d(0px, 0px, 0px);">
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

            <div class="col-md-3">
              <div class="card card-profile card-plain">
                <div class="card-avatar">
                  <a href="#">
                    <img class="img" src="{{/assets/img/faces/marc.jpg}}">
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

            <div class="col-md-3">
              <div class="card card-profile card-plain">
                <div class="card-avatar">
                  <a href="#pablo">
                    <img class="img" src="{{/assets/img/faces/kendall.jpg}}">
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
              <h2 class="title">We build awesome products</h2>
              <h5 class="description">This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information.</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="info info-horizontal">
                <div class="icon icon-rose">
                  <i class="material-icons">gesture</i>
                </div>
                <div class="description">
                  <h4 class="info-title">1. Design</h4>
                  <p>The moment you use Material Kit, you know you’ve never felt anything like it. With a single use, this powerfull UI Kit lets you do more than ever before. </p>
                  <a href="#pablo">Find more...</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="info info-horizontal">
                <div class="icon icon-rose">
                  <i class="material-icons">build</i>
                </div>
                <div class="description">
                  <h4 class="info-title">2. Develop</h4>
                  <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                  <a href="#pablo">Find more...</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="info info-horizontal">
                <div class="icon icon-rose">
                  <i class="material-icons">mode_edit</i>
                </div>
                <div class="description">
                  <h4 class="info-title">3. Make Edits</h4>
                  <p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>
                  <a href="#pablo">Find more...</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="about-office">
          <div class="row text-center">
            <div class="col-md-8 ml-auto mr-auto">
              <h2 class="title">Our office is our second home</h2>
              <h4 class="description">Here are some pictures from our office. You can see the place looks like a palace and is fully equiped with everything you need to get the job done.</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <img class="img-raised rounded img-fluid" alt="Raised Image" src="../assets/img/examples/office2.jpg">
            </div>
            <div class="col-md-4">
              <img class="img-raised rounded img-fluid" alt="Raised Image" src="../assets/img/examples/office4.jpg">
            </div>
            <div class="col-md-4">
              <img class="img-raised rounded img-fluid" alt="Raised Image" src="../assets/img/examples/office3.jpg">
            </div>
            <div class="col-md-6">
              <img class="img-raised rounded img-fluid" alt="Raised Image" src="../assets/img/examples/office5.jpg">
            </div>
            <div class="col-md-6">
              <img class="img-raised rounded img-fluid" alt="Raised Image" src="../assets/img/examples/office1.jpg">
            </div>
          </div>
        </div>
        <div class="about-contact">
          <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
              <h2 class="text-center title">Want to work with us?</h2>
              <h4 class="text-center description">Divide details about your product or agency work into parts. Write a few lines about each one and contact us about any further collaboration. We will get back to you in a couple of hours.</h4>
              <form class="contact-form">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group bmd-form-group">
                      <label for="name" class="bmd-label-floating">Your name</label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group bmd-form-group">
                      <label for="email" class="bmd-label-floating">Your Email</label>
                      <input type="email" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="dropdown bootstrap-select dropup"><select class="selectpicker" data-style="select-with-transition" data-size="7" tabindex="-98">
                      <option value="1" disabled="">Speciality</option>&gt;
                      <option value="2">I'm a Designer</option>
                      <option value="3">I'm a Developer</option>
                      <option value="4">I'm a Hero</option>
                    </select><button type="button" class="btn dropdown-toggle select-with-transition" data-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="false" title="I'm a Designer"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner">I'm a Designer</div></div> </div></button><div class="dropdown-menu" style="overflow: hidden; position: absolute; top: 10px; left: 1px; will-change: top, left;" x-placement="top-start"><div class="inner show" role="listbox" id="bs-select-1" tabindex="-1" style="overflow-y: auto;" aria-activedescendant="bs-select-1-1"><ul class="dropdown-menu inner show" role="presentation" style="margin-top: 0px; margin-bottom: 0px;"><li class="disabled"><a role="option" class="dropdown-item disabled" id="bs-select-1-0" aria-disabled="true" tabindex="-1"><span class="text">Speciality</span></a></li><li class="selected active"><a role="option" class="dropdown-item active selected" id="bs-select-1-1" tabindex="0" aria-setsize="3" aria-posinset="1" aria-selected="true"><span class="text">I'm a Designer</span></a></li><li><a role="option" class="dropdown-item" id="bs-select-1-2" tabindex="0"><span class="text">I'm a Developer</span></a></li><li><a role="option" class="dropdown-item" id="bs-select-1-3" tabindex="0"><span class="text">I'm a Hero</span></a></li></ul></div></div></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 ml-auto mr-auto text-center">
                    <button class="btn btn-primary btn-round">
                      Let's talk
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
