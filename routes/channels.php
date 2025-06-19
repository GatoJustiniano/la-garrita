<?php

use App\Models\User;
use App\Models\Proyect;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('room.{roomId}', function (User $user, $roomId) {
    return $user->only('id', 'name');
});

Broadcast::channel('boards.meeting.{proyect_id}', function (User $user, $proyect_id) {
    return true;
});
