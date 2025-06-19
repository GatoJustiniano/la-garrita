@section('title', 'Recuperar contraseña')
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
						<h4 class="mb-2">¿Olvidaste tu contraseña? 🔒</h4>
						<p class="mb-4">Ningún problema. Simplemente háganos saber su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña que le permitirá elegir una nueva.</p>
						<form id="formAuthentication" class="mb-3" method="POST" action="{{ route('password.email') }}">
							@csrf
							<div class="mb-3">
								<label for="email" class="form-label">Correo Electrónico</label>
								<input type="text" class="form-control" id="email" name="email" placeholder="Ingresa tu correo electrónico" autofocus>
									<x-input-error :messages="$errors->get('email')" class="mt-2" />
							</div>
							<x-primary-button
								class="btn btn-primary d-grid w-100"
								>
								{{ __('Enviar link') }}
							</x-primary-button>
						</form>
						<div class="text-center">
							<a href="{{ route('login') }}" class="d-flex align-items-center justify-content-center">
								<i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
								Volver al inicio de sesión
							</a>
						</div>

					</div>
				</div>
				<!-- /Register -->
			</div>
		</div>
	</div>
</x-guest-layout>