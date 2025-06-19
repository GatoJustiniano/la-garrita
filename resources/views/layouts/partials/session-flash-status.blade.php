@if ($settingGeneral->notification_type == 'nt-2-bootstrap')

    @if (session('status'))
        <div id="autoCloseAlert" class="alert alert-primary alert-dismissible text-center" role="alert">
            {{ session('status') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        </div>
    @endif

    @if (session('success'))
        <div id="autoCloseAlert" class="alert alert-success alert-dismissible text-center" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        </div>
    @endif

    @if (session('error'))
        <div id="autoCloseAlert" class="alert alert-danger alert-dismissible text-center" role="alert">
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        </div>
    @endif

    @if(session('warning'))
        <div id="autoCloseAlert" class="alert alert-warning alert-dismissible text-center">
            {{ session('warning') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        </div>        
    @endif

    @if(session('info'))
        <div id="autoCloseAlert" class="alert alert-info alert-dismissible text-center">
            {{ session('info') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        </div>        
    @endif

    @if(session('question'))
        <div id="autoCloseAlert" class="alert alert-dark alert-dismissible text-center">
            {{ session('question') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        </div>        
    @endif
@endif

{{-- ////////////// --}}

@if ($settingGeneral->notification_type == 'nt-1-sweetalert')

    @if(session('status'))
        <script>        
            Swal.fire({
                title: "{{ session('status') }}",            
                icon: "status",
            });        
        </script>     
    @endif

    @if(session('success'))
        <script>        
            Swal.fire({
                title: "{{ session('success') }}",            
                icon: "success",
            });        
        </script>     
    @endif

    @if(session('error'))
        <script>
            Swal.fire({
                title: "{{ session('error') }}", 
                icon: "error",
            });        
        </script>     
    @endif

    @if(session('warning'))
        <script>
            Swal.fire({
                title: "{{ session('warning') }}", 
                icon: "warning",
            });        
        </script>     
    @endif

    @if(session('info'))
        <script>
            Swal.fire({
                title: "{{ session('info') }}",
                icon: "info",
            });        
        </script>     
    @endif

    @if(session('question'))
        <script>
            Swal.fire({
                title: "{{ session('question') }}",
                icon: "question",
            });        
        </script>     
    @endif
@endif


<script>
    setTimeout(function() {
        $('#autoCloseAlert').alert('close');
    }, 5000); 
</script>