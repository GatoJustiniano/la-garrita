@section('title', 'Iniciar Sesión')

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
						<h4 class="mb-2">Bienvenido! 👋</h4>
						<p class="mb-4">Inicia sesión</p>
	
						<form id="formAuthentication" class="mb-3" method="POST" action="{{ route('login') }}">
							@csrf
							<div class="mb-3">
								<label for="email" class="form-label">Correo electrónico</label>
								<input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
									value="{{ old('email', null) }}" required autocomplete="email"
									placeholder="ingresa tu correo electrónico" autofocus>
	
								@error('email')
								<span class="invalid-feedback" role="alert">
									<strong>{{ $message }} error de correo</strong>
								</span>
								@enderror
							</div>
							<div class="mb-3 form-password-toggle">
								<div class="d-flex justify-content-between">
									<label class="form-label" for="password">Contraseña</label>
								</div>
								<div class="input-group input-group-merge">
									<input id="password" type="password" class="form-control 
										@error('password') is-invalid @enderror" name="password" required
										autocomplete="current-password" aria-describedby="password">
									@error('password')
									<span class="invalid-feedback" role="alert">
										<strong>{{ $message }}</strong>
									</span>
									@enderror
									<span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
								</div>
							</div>
							<div class="mb-3">
								<div class="d-flex justify-content-between">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember')
											? 'checked' : '' }}>
										<label class="form-check-label" for="remember-me">
											Recordame
										</label>
									</div>
									@if (Route::has('password.request'))
									<a href="{{ route('password.request') }}">
										<small>Has olvidado tu contraseña?</small>
									</a>
									@endif
								</div>
							</div>
							<div class="mb-3">
								<button class="btn btn-primary d-grid w-100" type="submit">Iniciar sesión</button>
							</div>
						</form>
	
						<p class="text-center">
							<span>Eres nuevo?</span>
							<a href="{{ route('register') }}">
								<span>Crea una cuenta</span>
							</a>
						</p>
	
					</div>
				</div>
				<!-- /Register -->
			</div>
		</div>
	</div>
</x-guest-layout>