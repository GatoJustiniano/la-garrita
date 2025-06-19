<div class="col-12 text-center">
	<button {{ $attributes->merge(
			[
			'type' => 'submit',
			'class' => 'btn btn-outline-success'
			]
		)
		}}
		>
		{{ $slot }}
	</button>
</div>