@extends('dashboard.proyect.component-general')
@section('title', 'Pizarra '. $proyect->id )

@section('content')

<div class="container-xxl flex-grow-1 container-p-y">

    <link type="text/css" rel="stylesheet" href="{{ asset('uml/UDStyle.css') }}" />
    <script type="text/javascript" src="{{ asset('uml/UDCore.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/UDModules.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/UDApplication.js') }}"></script>

    <script type="text/javascript" src="{{ asset('uml/export/beautify.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/export/vkbeautify.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/export/x2js.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/export/xmlviewer.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/export/convertToJava.js') }}"></script>
    <script type="text/javascript" src="{{ asset('uml/export/convertToCpp.js') }}"></script>

    <div id="umldiagram">

    </div>

    <script type="text/javascript">
        var app = new Application( { id: 'umldiagram', width: 728, height: 400 } );
    
        var board_id = "{{ $proyect->id }}";
        var leader_id = "{{ $proyect->leader_id }}";
        var xml_initial = '{!! $proyect->xml !!}';

        function startBoard(){
            generarDiagram();
        }
    
        window.onload = startBoard;
        //-----------------------------

        var generarDiagram = function(){
            app.delDiagram();
            app.setXMLString(xml_initial);
        }
    
    </script>

    <script>
        function uploadXMLAxios() {
            var xml = app.getXMLString();
            $("#myxml").val(xml);
            var data_xml = $("#xmlform").serialize();
            axios.post("{{ route('uploadXML', $proyect->id) }}", data_xml)
                .then(response => {
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }
    </script>
    <script type="module">
        Echo.channel('boards.meeting.{{ $proyect->id }}')
            .listenForWhisper('App.User.' + {{ auth()->id() }}, (e) => {
                console.log(e.message);
                Swal.fire('no hacer nada');
            })
            .listen('Metting', (e) => {
                app.delDiagram();
                app.setXMLString(e.message);
            });
    </script>

    <script type="text/javascript">
        Component.prototype.notifyDraw = function() {
            setTimeout(function() {
                uploadXMLAxios();
            }, 1575);
        };      
        
        
    </script>
    <script type="module">
        $("#export-java").on('click',function(){
            convertXMLToJava();
        });
        $("#export-xml").on('click',function(){
            exportXML();
            Swal.fire('Exportando xml');
        });
    </script>

    <div class="text-center">
        <h6>Exportar a:</h6>
        <button id="export-java" class="btn btn-label-info btn-sm" title="Descargar XML">
            JAVA
        </button>
        <button id="export-xml" class="btn btn-label-info btn-sm" title="Descargar XML">
            XML
        </button>
    </div>
    <div class="text-center mt-5">
        <h6>Exportar en Spring Boot:</h6>
        <button id="" class="btn btn-label-info btn-sm" title="Obtener Base de datos">
            Código
        </button>
    </div>
</div>
<div>
    <form id="xmlform" role="form" method="POST" class="invisible">
        @csrf
        <input type="text" name="myxml" id="myxml">
    </form>
</div>
@endsection