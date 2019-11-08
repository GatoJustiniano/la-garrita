<?php


Route::get('/', 'TestController@welcome');

Route::view('/about-us', 'about-us');



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
