@extends('layouts.master', ['activePage' => 'users'])

@section('content')

@include('layouts.partials.validation-error')
<div class="row">
	<div class="col-md-9">
		<div class="card">
			<div class="card-body ">
				<form action="{{ route('user.update',$user->id) }}" method="POST">
					@method('PUT')
					@include('dashboard.user._form', ['pass' => false])
				</form>
			</div>
		</div>
	</div>
	<div class="col-md-3">
		<div class="card">
			<div class="card-header">
				<a href="{{ URL::previous() }}" class="btn btn-label-secondary">
					Retroceder
				</a>
			</div>

		</div>
	</div>
</div>

@endsection