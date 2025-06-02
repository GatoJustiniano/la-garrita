<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" 
  class="dark-style layout-navbar-fixed layout-menu-fixed" data-base-url="{{url('/')}}" 
  dir="ltr" data-theme="theme-default" data-assets-path="{{ asset('/') }}"
  data-template="vertical-menu-template-dark"
  data-framework="laravel"
  >
  <head>
    @include('partials.head')
  </head>

  <body>

    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">

        <!-- Layout Content -->
        <x-layouts.menu.vertical :title="$title ?? null"></x-layouts.menu.vertical>
        <!--/ Layout Content -->

        <!-- Layout container -->
        <div class="layout-page">
          <!-- Navbar -->
          <x-layouts.navbar.default :title="$title ?? null"></x-layouts.navbar.default>
          <!--/ Navbar -->

          <!-- Content wrapper -->
          <div class="content-wrapper">
            <!-- Content -->
            <div class="container-xxl flex-grow-1 container-p-y">
              {{ $slot }}
            </div>
            <!-- / Content -->

            <!-- Footer -->
            <x-layouts.footer.default :title="$title ?? null"></x-layouts.footer.default>
            <!--/ Footer -->
            <div class="content-backdrop fade"></div>
            <!-- / Content wrapper -->
          </div>
        </div>
        <!-- / Layout page -->
      </div>
    </div>

    <!-- Include Scripts -->
    <!-- Main JS -->
    <script src="{{ asset('js/bt5/main.js') }}"></script>
    @include('partials.scripts')
    <!-- / Include Scripts -->
  </body>
</html>
