@extends('layouts.app')

@section('body-class', 'product-page')

@section('styles')
    <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css">
    
    <style>
      .page-header{
            min-height: 15vh !important;
            background-position: center !important;
        }

      .main {
        margin-top: 0px !important;
        padding-top: 0vh !important;
      }

      .fixed-top {
        position: absolute;
        padding-top: 20px !important;
      }

      h1 {
        font-size: 1.5em;
        margin-top: 0;
      }
      .sidebar {
          font-size: 0.85rem;
          line-height: 1;
      }

      .btn {
          font-size: 0.7rem;
      }

      .stack {
        font-size: 0.85em;
      }

      .date {
        min-width: 75px;
      }

      .text {
        word-break: break-all;
      }

      a.llv-active {
        z-index: 2;
        background-color: #f5f5f5;
        border-color: #777;
      }

      .list-group-item {
        word-wrap: break-word;
      }

      .folder {
        padding-top: 15px;
      }

      .div-scroll {
        height: 80vh;
        overflow: hidden auto;
      }
      .nowrap {
        white-space: nowrap;
      }
        
    </style>
@endsection

@section('content')
  <div class="page-header header-filter" style="background-image: url('{{ asset('img/city.jpg') }}');">
  </div>

  <div class="main main-raised">
    <div class="container">

      <div class="section">
          <div class="container-fluid">
            <div class="row">
              <div class="col sidebar mb-3">
                <h1><i class="fa fa-calendar" aria-hidden="true"></i> Lista de registros</h1>
                <div class="list-group div-scroll">
                @foreach($folders as $folder)
                  <div class="list-group-item">
                    <a href="?f={{ \Illuminate\Support\Facades\Crypt::encrypt($folder) }}">
                      <span class="fa fa-folder"></span> {{$folder}}
                    </a>
                    @if ($current_folder == $folder)
                      <div class="list-group folder">
                        @foreach($folder_files as $file)
                          <a href="?l={{ \Illuminate\Support\Facades\Crypt::encrypt($file) }}&f={{ \Illuminate\Support\Facades\Crypt::encrypt($folder) }}"
                            class="list-group-item @if ($current_file == $file) llv-active @endif">
                            {{$file}}
                          </a>
                        @endforeach
                      </div>
                    @endif
                  </div>
                @endforeach
                @foreach($files as $file)
                  <a href="?l={{ \Illuminate\Support\Facades\Crypt::encrypt($file) }}"
                    class="list-group-item @if ($current_file == $file) llv-active @endif">
                    {{$file}}
                  </a>
                @endforeach
              </div>
            </div>
          <div class="col-10 table-container">
              @if ($logs === null)
                <div>
                  Archivo log >50M, puede descargarlo.
                </div>
              @else
                <table id="table-log" class="table table-striped" data-ordering-index="{{ $standardFormat ? 2 : 0 }}">
                  <thead>
                  <tr>
                    @if ($standardFormat)
                      <th>Nivel</th>
                      <th>Contexto</th>
                      <th>Fecha</th>
                    @else
                      <th>Número de línea</th>
                    @endif
                    <th>Descripción</th>
                  </tr>
                  </thead>
                  <tbody>

                  @foreach($logs as $key => $log)
                    <tr data-display="stack{{{$key}}}">
                      @if ($standardFormat)
                        <td class="nowrap text-{{{$log['level_class']}}}">
                          <span class="fa fa-{{{$log['level_img']}}}" aria-hidden="true"></span>&nbsp;&nbsp;{{$log['level']}}
                        </td>
                        <td class="text">{{$log['context']}}</td>
                      @endif
                      <td class="date">{{{$log['date']}}}</td>
                      <td class="text">
                        @if ($log['stack'])
                          <button type="button"
                                  class="float-right expand btn btn-outline-dark btn-sm mb-2 ml-2"
                                  data-display="stack{{{$key}}}">
                            <span class="fa fa-search"></span>
                          </button>
                        @endif
                        {{{$log['text']}}}
                        @if (isset($log['in_file']))
                          <br/>{{{$log['in_file']}}}
                        @endif
                        @if ($log['stack'])
                          <div class="stack" id="stack{{{$key}}}"
                              style="display: none; white-space: pre-wrap;">{{{ trim($log['stack']) }}}
                          </div>
                        @endif
                      </td>
                    </tr>
                  @endforeach

                  </tbody>
                </table>
              @endif
              <div class="p-3">
                @if($current_file)
                  <a href="?dl={{ \Illuminate\Support\Facades\Crypt::encrypt($current_file) }}{{ ($current_folder) ? '&f=' . \Illuminate\Support\Facades\Crypt::encrypt($current_folder) : '' }}">
                    <span class="fa fa-download"></span> Descargar Archivo
                  </a>
                  -
                  <a id="clean-log" href="?clean={{ \Illuminate\Support\Facades\Crypt::encrypt($current_file) }}{{ ($current_folder) ? '&f=' . \Illuminate\Support\Facades\Crypt::encrypt($current_folder) : '' }}">
                    <span class="fa fa-sync"></span> Limpiar Archivo
                  </a>
                  -
                  <a id="delete-log" href="?del={{ \Illuminate\Support\Facades\Crypt::encrypt($current_file) }}{{ ($current_folder) ? '&f=' . \Illuminate\Support\Facades\Crypt::encrypt($current_folder) : '' }}">
                    <span class="fa fa-trash"></span> Eliminar Archivo
                  </a>
                  @if(count($files) > 1)
                    -
                    <a id="delete-all-log" href="?delall=true{{ ($current_folder) ? '&f=' . \Illuminate\Support\Facades\Crypt::encrypt($current_folder) : '' }}">
                      <span class="fa fa-trash-alt"></span> Eliminar todos los archivos
                    </a>
                  @endif
                @endif
              </div>
            </div>
      </div>

    </div>
  </div>

@endsection
@section('scripts')

  <!-- FontAwesome -->
  <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
  <!-- Datatables -->
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>
  <script>
    $(document).ready(function () {
      $('.table-container tr').on('click', function () {
        $('#' + $(this).data('display')).toggle();
      });
      $('#table-log').DataTable({
        "order": [$('#table-log').data('orderingIndex'), 'desc'],
        "stateSave": true,
        "stateSaveCallback": function (settings, data) {
          window.localStorage.setItem("datatable", JSON.stringify(data));
        },
        "stateLoadCallback": function (settings) {
          var data = JSON.parse(window.localStorage.getItem("datatable"));
          if (data) data.start = 0;
          return data;
        },
        "language" : {  
          "info" : "Mostrando _START_ a _END_ de _TOTAL_ archivos log",
          "search" : "Buscar:",  
          "paginate" : {
            "first":      "primero",
            "next" :      "siguiente",
            "previous" :  "anterior",
            "last" :      "último"
          },
          "lengthMenu": 'Mostrar <select class="form-control form-control-sm">'+
                        '<option value="5">5</option>'+
                        '<option value="10">10</option>'+
                        '<option value="20">20</option>'+
                        '<option value="-1">Todos</option>'+
                        '</select> registros',
          "loadingRecords" :  "Cargando...",
          "processing" :      "Procesando...",
          "emptyTable":       "No hay datos",
          "zeroRecords":      "No hay coincidencias",
          "infoEmpty" :       "Mostrando 0 a 0 de 0 archivos",
          "infoFiltered":     "(filtrado de _MAX_ archivos totales)",
          
        }
      });

      $('#delete-log, #clean-log, #delete-all-log').click(function () {
        return confirm('¿Está seguro?');
      });
    });
  </script>
@endsection

