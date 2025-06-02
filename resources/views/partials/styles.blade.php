<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
    href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
    rel="stylesheet">

@vite(['resources/assets/vendor/fonts/iconify/iconify.js'])

<!-- Icons -->
<link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">

<!-- Sweetalert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- Core CSS -->
@vite([
    'resources/assets/vendor/scss/core.scss',
    'resources/assets/css/demo.css', 
    'resources/css/app.css',
])

<!-- Core CSS -->
<link rel="stylesheet" href="{{ asset('css/bt5/core-dark.css') }}" class="template-customizer-core-css" />
<link rel="stylesheet" href="{{ asset('css/bt5/theme-default-dark.css') }}" class="template-customizer-theme-css" />

<!-- Vendors CSS -->
<link rel="stylesheet" href="{{ asset('css/bt5/perfect-scrollbar.css') }}" />
<link rel="stylesheet" href="{{ asset('css/bt5/datatables-bootstrap5.css') }}" />
<link rel="stylesheet" href="{{ asset('css/bt5/responsive-bootstrap5.css') }}" />
<link rel="stylesheet" href="{{ asset('css/bt5/buttons-bootstrap5.css') }}" />
<link rel="stylesheet" href="{{ asset('css/bt5/select2.css') }}" />
<link rel="stylesheet" href="{{ asset('css/bt5/form-validation.css') }}" />

<!-- Helpers -->
<script src="{{ asset('js/bt5/helpers.js') }}"></script>
<!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
<!--? Template customizer: To hide customizer set displayCustomizer value false in config.js.  -->
<script src="{{ asset('js/bt5/template-customizer.js') }}"></script>
<!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
<script src="{{ asset('js/bt5/config.js') }}"></script>


<!-- Vendor Styles -->
@yield('vendor-style')

<!-- Page Styles -->
@yield('page-style')