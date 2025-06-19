@extends('errors::minimal')

@section('title', __('Forbidden'))
@section('code', '403' . ' You are not authorized!')
@section('message', 
    'No tiene permiso para ver esta página utilizando las credenciales que proporcionó al iniciar sesión.
    Comuníquese con el administrador.'
)
