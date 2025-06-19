<?php

namespace Database\Seeders;

use App\Models\SettingGeneral;
use Illuminate\Database\Seeder;

class SettingGeneralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $config = SettingGeneral::create([
            'site_title' => 'La Garrita',
            'site_logo' => 'logo_lagarrita.svg',
            'currency' => 'BOB',
            'date_format' => 'd-m-Y',
            't_c' => '6,94',
            'notification_type' => 'nt-1-sweetalert',
        ]);
    }
}
