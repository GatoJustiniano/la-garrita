@section('title', 'Registrarse')
<x-guest-layout>
	<div class="container-xxl">
		<div class="authentication-wrapper authentication-basic container-p-y">
			<div class="authentication-inner">
				<!-- Register -->
				<div class="card">
					<div class="card-body">
						<!-- Logo -->
						<x-logo-html>
						</x-logo-html>
						<!-- /Logo -->
						<h4 class="mb-2">Registrate ahora! 👋</h4>

						<form class="row g-3" method="POST" action="{{ route('register') }}">
							@csrf
							<div class="col-md-6">
								<label for="name" class="form-label">Nombre</label>
								<input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name"
									value="{{ old('name') }}" required autocomplete="name" autofocus>

								@error('name')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
							<div class="col-md-6">
								<label for="middle_name" class="form-label">Segundo Nombre</label>
								<input id="middle_name" type="text" class="form-control @error('middle_name') is-invalid @enderror"
									name="middle_name" value="{{ old('middle_name') }}" autocomplete="middle_name" autofocus>
								@error('middle_name')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
							<div class="col-md-6">
								<label for="last_name" class="form-label">Apellido Paterno</label>
								<input id="last_name" type="text" class="form-control @error('last_name') is-invalid @enderror"
									name="last_name" value="{{ old('last_name') }}" required autocomplete="last_name" autofocus>

								@error('last_name')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
							<div class="col-md-6">
								<label for="maternal_last_name" class="form-label">Apellido Materno</label>
								<input id="maternal_last_name" type="text"
									class="form-control @error('maternal_last_name') is-invalid @enderror" name="maternal_last_name"
									value="{{ old('maternal_last_name') }}" autocomplete="maternal_last_name" autofocus>

								@error('maternal_last_name')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
							<div class="col-md-12">
								<label for="email" class="form-label">Correo electrónico</label>
								<input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
									value="{{ old('email') }}" required autocomplete="email">

								@error('email')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }}</strong>
								</span>
								@enderror
							</div>
							<div class="col-md-6 form-password-toggle">
								<label class="form-label" for="password">Contraseña</label>
								<div class="input-group input-group-merge">
									<input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
										name="password" required autocomplete="new-password">

									@error('password')
									<span class="invalid-feedback" role="alert">
										<strong>{{ $message }}</strong>
									</span>
									@enderror
									<span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
								</div>
							</div>
							<div class="col-md-6 form-password-toggle">
								<label class="form-label" for="password-confirm">Confirmar contraseña</label>
								<div class="input-group input-group-merge">
									<input id="password-confirm" type="password" class="form-control" name="password_confirmation"
										required autocomplete="new-password">
									<span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
								</div>
							</div>

							<div class="mb-3">
								<button class="btn btn-primary d-grid w-100" type="submit">Registrarse</button>
							</div>
						</form>

						<p class="text-center">
							<span>Tienes una cuenta?</span>
							<a href="{{ route('login') }}">
								<span>Inicia sesión</span>
							</a>
						</p>

					</div>
				</div>
				<!-- /Register -->
			</div>
		</div>
	</div>
</x-guest-layout>