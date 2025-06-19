<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'stock',
        'status',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    // protected static function booted()
    // {
    //     static::addGlobalScope(new AvailableScope);

    //     static::updated(function($product) {
    //         if ($product->stock == 0 && $product->status == 'available') {
    //             $product->status = 'unavailable';

    //             $product->save();
    //         }
    //     });
    // }

    public function carts()
    {
        return $this->morphedByMany(Cart::class, 'productable')->withPivot('quantity');
    }

    public function orders()
    {
        return $this->morphedByMany(Order::class, 'productable')->withPivot('quantity');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    // scope
    public function scopeAvailable($query)
    {
        $query->where('status', 'available');
    }

    // accesor
    public function getTotalAttribute()
    {
        return $this->pivot->quantity * $this->price;
    }
}
