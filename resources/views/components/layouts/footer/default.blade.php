<!-- Footer-->
<footer class="content-footer footer bg-footer-theme">
  <div class="container-xxl">
    <div class="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
      <div class="text-body">
        © <?php echo date('Y'); ?>, realizado por <a href="{{ (!empty(config('variables.creatorUrl')) ? config('variables.creatorUrl') : '') }}" target="_blank" class="footer-link">{{ (!empty(config('variables.creatorName')) ? config('variables.creatorName') : '') }}</a>
      </div>
      <div class="d-none d-lg-inline-block">
        <a href="{{ config('variables.gitRepo') ? config('variables.gitRepo') : '#' }}" target="_blank" class="footer-link d-none d-sm-inline-block">GitHub</a>
      </div>
    </div>
  </div>
</footer>
<!--/ Footer-->
