<div class="row g-3">
	@csrf
	<div class="col-md-6">
		<label class="form-label" for="name">Nombre</label>
		<input class="form-control" type="text" name="name" id="name" value="{{ old('name',$user->name) }}">
	</div>
	
	<div class="col-md-6">
		<label class="form-label" for="middle_name">Segundo Nombre</label>
		<input class="form-control" type="text" name="middle_name" id="middle_name"
			value="{{ old('middle_name',$user->middle_name) }}">
	</div>
	
	<div class="col-md-6">
		<label class="form-label" for="last_name">Apellido Paterno</label>
		<input class="form-control" type="text" name="last_name" id="last_name"
			value="{{ old('last_name',$user->last_name) }}">
	</div>
	
	<div class="col-md-6">
		<label class="form-label" for="maternal_last_name">Apellido Materno</label>
		<input class="form-control" type="text" name="maternal_last_name" id="maternal_last_name"
			value="{{ old('maternal_last_name',$user->maternal_last_name) }}">
	</div>
	
	<div class="col-md-6">
		<label class="form-label" for="email">Correo electrónico</label>
		<input class="form-control" type="email" name="email" id="email" value="{{ old('email',$user->email) }}">
	</div>
	
	@if ($pass)
	<div class="col-md-6">
		<label class="form-label" for="password">Contraseña</label>
		<input class="form-control" type="password" name="password" id="password"
			value="{{ old('password',$user->password) }}">
	</div>
	@endif
	
	<div class="col-md-6">
		<label for="roles" class="col-sm-2 col-form-label">Roles</label>
		<table class="table">
			<tbody>
				@foreach ($roles as $id => $role)
				<tr>
					<td>
						<div class="form-check">
							<label class="form-check-label">
								<input class="form-check-input" type="checkbox" name="roles[]" 
									value="{{ $role }}" 
									@foreach ($user->roles as $isRol)
										{{ $isRol->id == $id ? 'checked' : '' }}
									@endforeach
								>
								<span class="form-check-sign">
									<span class="check"></span>
								</span>
							</label>
						</div>
					</td>
					<td>
						{{ $role }}
					</td>
				</tr>
				@endforeach
			</tbody>
		</table>
	</div>
	<x-confirm-button>
		@if ($pass)
			{{ __('Guardar') }}
			@else
			{{ __('Actualizar') }}
		@endif
	</x-confirm-button>

</div>