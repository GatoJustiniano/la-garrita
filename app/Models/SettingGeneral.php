<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SettingGeneral extends Model
{
    protected $fillable =[

        "site_title", 
        "site_logo", 
        "currency", 
        "date_format", 
        "t_c",     
        "notification_type"     
    ];
}
