@csrf

<div class="mb-3">
	<label class="form-label" for="name">Nombre del Proyecto</label>
	<input class="form-control" type="text" name="name" id="name" value="{{ old('name', $proyect->name) }}">
</div>

<div class="mb-3">
	<label class="form-label" for="description">Descripción</label>
	<input class="form-control" type="text" name="description" id="description"
		value="{{ old('description', $proyect->description) }}">
</div>

<div class="row mb-3">
	<label for="personals" class="col-sm-3 col-form-label">Asignar Personal</label>
	<div class="col-sm-7">
		<table class="table">
			<tbody>
				@foreach ($users as $user)
				<tr>
					<td>
						<div class="form-check">
							<label class="form-check-label">
								<input class="form-check-input" type="checkbox" name="personals[]"
									value="{{ $user->id }}"
									@foreach ($proyect->users as $personal)
											{{ $personal->id == $user->id ? 'checked' : '' }}
									@endforeach
								>
								<span class="form-check-sign">
									<span class="check"></span>
								</span>
							</label>
						</div>
					</td>
					<td>
						{{ $user->fullName }}
					</td>
				</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>

<x-confirm-button>
	@if ($formCreate)
		{{ __('Guardar') }}
		@else
		{{ __('Actualizar') }}
	@endif
</x-confirm-button>