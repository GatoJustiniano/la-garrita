@extends('layouts.app')

@section('body-class', 'login-page sidebar-collapse')

@section('styles')
    <style>
      @media (min-width: 992px) {
        .page-header > div:nth-child(1){
          padding-top: 10vh !important;
        }
      }
      .form-check {
        padding-left: 7px !important;
      }
        
    </style>
@endsection

@section('content')

<div class="page-header header-filter" style="background-image: url('{{ asset('img/bg7.jpg') }}'); background-size: cover; background-position: top center;">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 ml-auto mr-auto">
          <div class="card card-login">

            <form class="form" method="POST" action="{{ route('login') }}">
              @csrf

              <div class="card-header card-header-primary text-center">
                <h4 class="card-title">Inicio de sesión</h4>
              </div>
              <p class="description text-center">Ingresa tus datos</p>

              <div class="card-body">

                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">mail</i>
                    </span>
                  </div>
                  <input id="email" type="email" placeholder="Correo" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" required autofocus>
                </div>



                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="material-icons">lock_outline</i>
                    </span>
                  </div>
                    <input placeholder="Contraseña" id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                  </div>

                <div class="form-check">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>                
                        Recordar sesión
                        <span class="form-check-sign">
                            <span class="check"></span>
                        </span>
                    </label>
                </div>

              </div>


              <div class="footer text-center">
                <button type="submit" class="btn btn-simple btn-primary btn-lg">Ingresar</button>             
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    @include('includes.footer')
</div>
@endsection



