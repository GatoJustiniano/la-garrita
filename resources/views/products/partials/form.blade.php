<div class="form-group">
	{{ Form::label('name', 'Nombre de la etiqueta') }}
	{{ Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) }}
</div>
<div class="form-group">
	{{ Form::label('description', 'Descripción') }}
	{{ Form::textarea('description', null, ['class' => 'form-control']) }}
</div>
<div class="form-group">
	{{ Form::label('description_long', 'Descripción Larga') }}
	{{ Form::textarea('long_description', null, ['class' => 'form-control']) }}
</div>
<div class="form-group">
	{{ Form::label('price', 'Precio') }}
	{{ Form::textarea('price', null, ['class' => 'form-control']) }}
</div>
<div class="form-group">
	{{ Form::submit('Guardar', ['class' => 'btn btn-sm btn-primary']) }}
</div>