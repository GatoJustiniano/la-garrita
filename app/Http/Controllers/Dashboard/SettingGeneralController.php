<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SettingGeneral;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SettingGeneralController extends Controller
{
    public function generalSetting()
    {
        Gate::authorize('setting');
        $data_setting = SettingGeneral::latest()->first();                
        return view('setting.setting', compact('data_setting'));
    }

    public function generalSettingStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'site_logo' => 'file|mimes:svg|max:512',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->except('site_logo');        

        $general_setting = SettingGeneral::latest()->first();
        $general_setting->id = 1;
        $general_setting->site_title = $data['site_title'];
        $general_setting->currency = $data['currency'];                
        $general_setting->date_format = $data['date_format'];
        $general_setting->t_c = $data['t_c'];
        $general_setting->notification_type = $data['notification_type'];

        $logo = $request->file('site_logo');
        if ($logo) {
            $logoName = 'logo_' . Str::random(7) . '.' . $logo->getClientOriginalExtension();
            $logo->move('img_logo', $logoName);
            $general_setting->site_logo = $logoName;
        }
        $general_setting->save();    
        return redirect()->back()->with('success', 'Datos actualizados con éxito');
    }
}
