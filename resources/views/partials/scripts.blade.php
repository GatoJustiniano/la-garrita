<!-- BEGIN: Vendor JS-->

@vite([
  'resources/assets/vendor/libs/jquery/jquery.js',
  'resources/assets/vendor/libs/popper/popper.js',
  'resources/assets/vendor/js/bootstrap.js',
])

<!-- Core JS -->
<!-- build:js assets/vendor/js/core.js -->
<script src="{{ asset('js/bt5/libs/jquery.js') }}"></script>
<script src="{{ asset('js/bt5/libs/popper.js') }}"></script>
<script src="{{ asset('js/bt5/bootstrap.js') }}"></script>

<script src="{{ asset('js/bt5/libs/perfect-scrollbar.js') }}"></script>
<script src="{{ asset('js/bt5/libs/hammer.js') }}"></script>
<script src="{{ asset('js/bt5/libs/typeahead.js') }}"></script>
<script src="{{ asset('js/bt5/libs/i18n.js') }}"></script>
<script src="{{ asset('js/bt5/menu.js') }}"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<!-- endbuild -->

<!-- Vendors JS -->
<script src="{{ asset('js/bt5/libs/datatables-bootstrap5.js') }}"></script>
<script src="{{ asset('js/bt5/libs/form-validation-popular.js') }}"></script>
<script src="{{ asset('js/bt5/libs/form-validation-bootstrap5.js') }}"></script>
<script src="{{ asset('js/bt5/libs/form-validation-auto-focus.js') }}"></script>

<script src="{{ asset('js/bt5/libs/cleave.js') }}"></script>
<script src="{{ asset('js/bt5/libs/cleave-phone.js') }}"></script>



<!-- Page Vendor JS-->
@yield('vendor-script')
<!-- END: Page Vendor JS-->

@vite(['resources/js/app.js'])

<!-- BEGIN: Page JS-->
@yield('page-script')
<!-- END: Page JS-->

<!-- Place this tag before closing body tag for github widget button. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
