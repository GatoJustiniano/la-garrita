<?php

namespace App\Traits;

use Illuminate\Support\Facades\Gate;

trait GeneralTrait {

    function generateButtons($name, $id) {
        $buttonsHtml = '';

        if (Gate::allows("${name}.show")) {
            $buttonsHtml .= '
                <a href="' . route("${name}.show", $id) . '" 
                    class="btn btn-outline-secondary btn-sm btn-icon"> 
                    <i class="material-icons">visibility</i> 
                </a>';
        }
    
        if (Gate::allows("${name}.edit")) {
            $buttonsHtml .= '
                <a href="' . route("${name}.edit", $id) . '" 
                    class="btn btn-outline-secondary btn-sm btn-icon">
                    <i class="material-icons">edit</i>
                </a>';
        }              
        return $buttonsHtml;
    }

}