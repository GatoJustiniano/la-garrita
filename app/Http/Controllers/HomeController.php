<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function dashboard()
    {
        $activePage='';
        return view('layouts.master', compact('activePage'));
    }
}
