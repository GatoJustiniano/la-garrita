<div class="form-group">
	{{ Form::label('name', 'Nombre del producto:') }}
	{{ Form::text('name', null, ['class' => 'form-control', 'id' => 'name']) }}
</div>
<div class="form-group">
	{{ Form::label('description', 'Descripción:') }}
	{{ Form::textarea('description', null, ['class' => 'form-control','rows' => '3']) }}
</div>
<div class="form-group">
	{{ Form::label('description_long', 'Descripción Larga:') }}
	{{ Form::textarea('long_description', null, ['class' => 'form-control','rows' => '5']) }}
</div>
<div class="form-group">
	{{ Form::label('price', 'Precio:') }}
	{{ Form::textarea('price', null, ['class' => 'form-control', 'rows' => '1']) }}
</div>
<div class="form-group">
	{{ Form::submit('Guardar', ['class' => 'btn btn-sm btn-primary']) }}
</div>