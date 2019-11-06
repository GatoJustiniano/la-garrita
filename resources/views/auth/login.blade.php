@extends('layouts.app')

@section('body-class', 'login-page')

@section('content')

<div class="page-header header-filter" style="background-image: url('{{ asset('img/bg7.jpg') }}'); background-size: cover; background-position: top center;">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 ml-auto mr-auto">
          <div class="card card-login">
            <form class="form" method="POST" action="{{ route('login') }}">
                    {{ csrf_field() }}

                    <div class="header header-primary text-center">
                        <h4>Inicio de sesión</h4>
                    </div>
                    <p class="text-divider">Ingresa tus datos</p>
                    <div class="content">

                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">fingerprint</i>
                            </span>
                            <input id="username" type="text" placeholder="Username" class="form-control" name="username" value="{{ old('username') }}" required autofocus>
                        </div>

                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">lock_outline</i>
                            </span>
                            <input placeholder="Contraseña" id="password" type="password" class="form-control" name="password" required />
                        </div>

                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                Recordar sesión
                            </label>
                        </div>
                    </div>
                    <div class="footer text-center">
                        <button type="submit" class="btn btn-simple btn-primary btn-lg">Ingresar</button>
                    </div>
                    <!-- <a class="btn btn-link" href="{{ route('password.request') }}">
                        Forgot Your Password?
                    </a> -->
            </form>
          </div>
        </div>
      </div>
    </div>

    @include('includes.footer')
</div>
@endsection



