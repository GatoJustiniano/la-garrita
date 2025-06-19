<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Proyect extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'xml',
        'leader_id',
    ];

    public function users()
    {
        return $this->morphToMany(User::class, 'proyectable');
    }

    public function leader()
    {
        return $this->belongsTo(User::class, 'leader_id');
    }

}
