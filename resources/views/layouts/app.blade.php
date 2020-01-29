<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="utf-8" />
        <link rel="apple-touch-icon" sizes="76x76" href="../img/apple-icon.png">
        <link rel="icon" type="image/png" href="../img/favicon.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        <title>@yield('title', config('app.name'))</title>

        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
        <!--     Fonts and icons     -->
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
        

        <!-- CSS Files -->
        <link href="{{ asset('/css/material-kit.min.css') }}" rel="stylesheet"/>
        <!-- CSS Just for demo purpose, don't include it in your project -->
        <link href="{{ asset('demo/demo.css') }}" rel="stylesheet" />

                
        @yield('styles')
    </head>

    <body class="@yield('body-class')">
        <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
            <div class="container">
                <div class="navbar-translate">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <div class="logo-big">
                            <img src="{{ asset('/img/big-logo.png') }}" class="img-fluid">
                        </div>
                        <div class="logo-small">
                            <img src="{{ asset('/img/logo.png') }}" class="img-fluid">
                        </div>
                        <div class="ripple-container"></div>
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="navbar-toggler-icon"></span>
                        <span class="navbar-toggler-icon"></span>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div class="nav-bar">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        @can('products.index')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('products.index') }}">Productos</a>
                        </li>
                        @endcan
                        @can('users.index')
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('users.index') }}">Usuarios</a>
                        </li>
                        @endcan
                        @can('roles.index')
                        <li class="nav-item">                            
                            <a class="nav-link" href="{{ route('roles.index') }}">Roles</a>
                        </li>
                        @endcan
                        @can('logs')
                        <li class="nav-item">                            
                            <a class="nav-link" href="{{ route('bitacora') }}">Bitácora</a>
                        </li>
                        @endcan
                    </ul>
                </div>


                <div class="collapse navbar-collapse">
                    
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        @guest
                            <li class="dropdown nav-item">
                                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <i class="material-icons">apps</i> Sesion
                                </a>
                                <div class="dropdown-menu dropdown-with-icons">
                                    <a href="{{ route('login') }}" class="dropdown-item">
                                    <i class="material-icons">person</i> Ingresar
                                    </a>
                                    <a href="{{ route('register') }}" class="dropdown-item">
                                    <i class="material-icons">person_outline</i> Registrarme
                                    </a>
                                </div>
                            </li>
                        @else
                            <li class="dropdown nav-item">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>
                        
                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ url('/home') }}">Carrito de compras</a>
                                    </li>
                                    @if (auth()->user()->admin)
                                    <li>
                                        <a href="{{ url('/admin/categories') }}">Gestionar categorías</a>
                                    </li>
                                    <li>
                                        <a href="{{ url('/admin/products') }}">Gestionar productos</a>
                                    </li>
                                    @endif
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                        document.getElementById('logout-form').submit();">
                                            Cerrar Sesión
                                        </a>
                        
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endguest            
                    </ul>
                </div>
            </div>
        </nav>
       
        @if (session('info'))
        <div class="alert alert-info" style="margin-top: 6rem;">
            <div class="container">
                <div class="alert-icon">
                    <i class="material-icons">info_outline</i>
                </div>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><i class="material-icons">clear</i></span>
                </button>
                {{ session('info') }} 
            </div>
        </div>
        @endif
        <div class="wrapper">
            @yield('content')
        </div>
    </body>

    <!--   Core JS Files   -->
    <script src="{{ asset('/js/core/jquery.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/js/core/popper.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/js/core/bootstrap-material-design.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('/js/plugins/moment.min.js') }}"></script>

    <!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
    <script src="{{ asset('/js/plugins/nouislider.min.js') }}" type="text/javascript"></script>

    <!--  Plugin for the Datepicker, full documentation here: http://www.eyecon.ro/bootstrap-datepicker/ -->
    <script src="{{ asset('/js/plugins/bootstrap-datetimepicker.js') }}" type="text/javascript"></script>

    

    <!-- Control Center for Material Kit: activating the ripples, parallax effects, scripts from the example pages etc -->
    <script src="{{ asset('/js/material-kit.js') }}" type="text/javascript"></script>
    @yield('scripts')

</html>
