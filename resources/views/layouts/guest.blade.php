<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" 
	class="dark-style layout-navbar-fixed layout-menu-fixed "
	dir="ltr" data-theme="theme-default" data-assets-path="{{ asset('/') }}"
	data-template="vertical-menu-template-dark">

<head>
	<meta charset="utf-8" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title> @yield('title') | {{ $settingGeneral->site_title }} - Gato Justiniano</title>

	<!-- Favicon -->
	<link rel="icon" type="image/vnd.microsoft.icon" href="{{ url('/favicon.ico') }}">

	<!-- Scripts -->
	@vite(['resources/js/app.js'])

	<!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

	<!-- Icons -->
	<link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">

	<!-- Core CSS -->
	<link rel="stylesheet" href="{{ asset('css/bt5/core-dark.css') }}" class="template-customizer-core-css" />
	<link rel="stylesheet" href="{{ asset('css/bt5/theme-default-dark.css') }}" class="template-customizer-theme-css" />
	<link rel="stylesheet" href="{{ asset('css/bt5/demo.css') }}" />

	<!-- Vendors CSS -->
	<link rel="stylesheet" href="{{ asset('css/bt5/perfect-scrollbar.css') }}" />
	<link rel="stylesheet" href="{{ asset('css/bt5/datatables-bootstrap5.css') }}" />
	<link rel="stylesheet" href="{{ asset('css/bt5/responsive-bootstrap5.css') }}" />
	<link rel="stylesheet" href="{{ asset('css/bt5/buttons-bootstrap5.css') }}" />
	<link rel="stylesheet" href="{{ asset('css/bt5/select2.css') }}" />
	<link rel="stylesheet" href="{{ asset('css/bt5/form-validation.css') }}" />

	<!-- Page CSS -->
	<link rel="stylesheet" href="{{ asset('css/page-auth.css') }}" />
	
	<!-- Helpers -->
	<script src="{{ asset('js/bt5/helpers.js') }}"></script>

	<!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
	<!--? Template customizer: To hide customizer set displayCustomizer value false in config.js.  -->
	<script src="{{ asset('js/bt5/template-customizer.js') }}"></script>
	<!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
	<script src="{{ asset('js/bt5/config.js') }}"></script>

	<style>
		#template-customizer{
			visibility: hidden !important;
		}
	</style>
	@stack('styles')
</head>

<body>

	<main>
		{{ $slot }}
	</main>

	<!-- Core JS -->
	<!-- build:js assets/vendor/js/core.js -->
	<script src="{{ asset('js/bt5/libs/jquery.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/popper.js') }}"></script>
	<script src="{{ asset('js/bt5/bootstrap.js') }}"></script>

	<script src="{{ asset('js/bt5/libs/perfect-scrollbar.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/hammer.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/typeahead.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/i18n.js') }}"></script>
	<script src="{{ asset('js/bt5/menu.js') }}"></script>
	
	<!-- endbuild -->
	
	<!-- Vendors JS -->
	<script src="{{ asset('js/bt5/libs/datatables-bootstrap5.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/form-validation-popular.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/form-validation-bootstrap5.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/form-validation-auto-focus.js') }}"></script>

	<script src="{{ asset('js/bt5/libs/cleave.js') }}"></script>
	<script src="{{ asset('js/bt5/libs/cleave-phone.js') }}"></script>

	<!-- Main JS -->
	<script src="{{ asset('js/bt5/main.js') }}"></script>

	@stack('scripts')
</body>

</html>