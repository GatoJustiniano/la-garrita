<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark-style layout-wide  customizer-hide" dir="ltr"
    data-theme="theme-default" data-assets-path="{{ asset('/') }}" data-template="vertical-menu-template-dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>@yield('title')</title>
    
    <link rel="stylesheet" href="{{ asset('css/bt5/core-dark.css') }}" class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('css/bt5/theme-default-dark.css') }}" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('css/bt5/demo.css') }}" />    
    <script src="{{ asset('js/bt5/helpers.js') }}"></script>
    <script src="{{ asset('js/bt5/template-customizer.js') }}"></script>
    <script src="{{ asset('js/bt5/config.js') }}"></script>

    <style>
        .misc-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: calc(100vh - 1.625rem*2);
            text-align: center
        }
    </style>
</head>

<body>

    <!-- Error -->
    <div class="container-xxl container-p-y">
        <div class="misc-wrapper">
            <h2 class="mb-2 mx-2">@yield('code')</h2>
            <p class="mb-4 mx-2">@yield('message')</p>
            <a href="{{ route('dashboard') }}" class="btn btn-primary">Volver al inicio</a>
            <div class="wrap">
                @yield('visual')
                <canvas width="400" height="200"></canvas>
            </div>            
        </div>
    </div>
    <!-- /Error -->


    <!-- Core JS -->    
    <script src="{{ asset('js/bt5/libs/jquery.js') }}"></script>
    <script src="{{ asset('js/bt5/bootstrap.js') }}"></script>
    <script src="{{ asset('js/bt5/menu.js') }}"></script>
</body>

</html>