<div class="app-brand justify-content-center">
    <a href="/" class="app-brand-link gap-2">
        @if (!empty($settingGeneral))
        <span class="app-brand-logo demo">
            <img width="40px" src="{{ asset('img_logo/' . $settingGeneral->site_logo)}}" alt="icon" />
        </span>
        <span class="app-brand-text demo text-body fw-bolder">
            {{ $settingGeneral->site_title }}
        </span>
        @endif
    </a>
</div>