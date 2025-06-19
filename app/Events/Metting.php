<?php

namespace App\Events;

use App\Models\Proyect;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class Metting implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $proyect;
    public $message;

    public function __construct(Proyect $proyect, $message)
    {
        $this->proyect = $proyect;
        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel("boards.meeting.{$this->proyect->id}"),
        ];
    }
}
