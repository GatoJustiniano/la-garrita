<?php

namespace App\Providers;

use App\Models\SettingGeneral;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Paginator::useBootstrapFive();

        try {
            View::share('settingGeneral', SettingGeneral::latest()->first());
        } catch (\Throwable $e) {
            Log::error(
                'AppServiceProvider \n Could not connect to the database. Please check your configuration.', 
                ['error' => $e->getMessage()]
            );
            View::share('settingGeneral', new SettingGeneral());
        }
    }
}
