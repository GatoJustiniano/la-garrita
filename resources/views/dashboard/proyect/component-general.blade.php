<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark-style layout-navbar-fixed layout-menu-fixed "
	dir="ltr" data-theme="theme-default" data-assets-path="{{ asset('/') }}"
	data-template="vertical-menu-template-dark">

<head>
	<meta charset="utf-8" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

	<title> @yield('title') | Dashboard - Gato Justiniano</title>

	<!-- Favicon -->
	<link rel="icon" type="image/vnd.microsoft.icon" href="{{ url('/favicon.ico') }}">

	<!-- Iconos -->
	<link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">

	<!-- Scripts laravel-sweetalert-->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	@vite(['resources/js/app.js'])
	
	<!-- Scripts otros -->
	<script src="{{ asset('uml/jquery.min.js')}}"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
		integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ=="
		crossorigin="anonymous"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
		integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="
		crossorigin="anonymous">


	<link rel="stylesheet" href="{{ asset('css/bt5/core-dark.css') }}" class="template-customizer-core-css" />
	<link rel="stylesheet" href="{{ asset('css/bt5/theme-default-dark.css') }}" class="template-customizer-theme-css" />
	<script src="{{ asset('js/bt5/helpers.js') }}"></script>
	<script src="{{ asset('js/bt5/template-customizer.js') }}"></script>
	<script src="{{ asset('js/bt5/config.js') }}"></script>

</head>

<body>

	<div class="layout-wrapper layout-content-navbar  layout-without-menu">
		<div class="layout-container">
			<div class="layout-page">
				<nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
					id="layout-navbar">

					<div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

						<!-- Info -->
						<div class="navbar-nav align-items-center">
							<div class="nav-item navbar-search-wrapper mb-0">
								<a href="/dashboard" class="app-brand-link">
									<span class="app-brand-logo demo">
										@if (!empty($settingGeneral->site_logo))
										<img width="40px" src="{{ asset('img_logo/' . $settingGeneral->site_logo)}}"
											alt="icon" />
										@else
										<img width="40px" src="" alt="icon" />
										@endif
									</span>
									<span class="app-brand-text demo menu-text fw-bolder ms-2">
										{{ $settingGeneral->site_title }}
									</span>
								</a>
							</div>
						</div>
						<!-- /Info -->


						<ul class="navbar-nav flex-row align-items-center ms-auto">



							<!-- Style Switcher -->
							<li class="nav-item me-2 me-xl-0">
								<a class="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
									<i class='bx bx-sm'></i>
								</a>
							</li>
							<!--/ Style Switcher -->

							<!-- User -->
							<li class="nav-item navbar-dropdown dropdown-user dropdown">
								<a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);"
									data-bs-toggle="dropdown">
									<div class="avatar avatar-online">
										<img src="{{ (Auth::user()->image ? asset(Auth::user()->image->path) : '') ?? '' }}" alt
											class="w-px-40 h-auto rounded-circle">
									</div>
								</a>
								<ul class="dropdown-menu dropdown-menu-end">
									<li>
										<a class="dropdown-item" href="">
											<div class="d-flex">
												<div class="flex-shrink-0 me-3">
													<div class="avatar avatar-online">
														<img src="{{ (Auth::user()->image ? asset(Auth::user()->image->path) : '') ?? '' }}" alt
															class="w-px-40 h-auto rounded-circle">
													</div>
												</div>
												<div class="flex-grow-1">
													<span class="fw-semibold d-block">{{ Auth::user()->name }}</span>
													@forelse (Auth::user()->roles as $role)
													<small class="text-muted">{{ $role->name }}</small>
													@empty
													<small class="text-muted">Sin roles</small>
													@endforelse
												</div>
											</div>
										</a>
									</li>
									<li>
										<div class="dropdown-divider"></div>
									</li>
									<li>
										<a class="dropdown-item" href="{{ route('user.show',Auth::user()->id) }}">
											<i class="bx bx-user me-2"></i>
											<span class="align-middle">Perfil</span>
										</a>
									</li>
									<li>
										<div class="dropdown-divider"></div>
									</li>
									<li>
										<a class="dropdown-item" href="">
											<i class="bx bx-file me-2"></i>
											<span class="align-middle">Documentación</span>
										</a>
									</li>
									<li>
										<div class="dropdown-divider"></div>
									</li>
									<li>
										<a class="dropdown-item" href="{{ route('logout') }}" target="_blank" onclick="event.preventDefault();
										document.getElementById('logout-form').submit();">

											<i class="bx bx-power-off me-2"></i>
											<span class="align-middle">Cerrar Sesión</span>
										</a>
										<form id="logout-form" action="{{ route('logout') }}" method="POST"
											class="d-none">
											@csrf
										</form>
									</li>
								</ul>
							</li>
							<!--/ User -->


						</ul>
					</div>


				</nav>
				<!-- Content -->
				<div class="contenido">
					@include('layouts.partials.session-flash-status')
					@yield('content')
				</div>
				<!-- / Content -->
			</div>
		</div>
	</div>



</body>

</html>