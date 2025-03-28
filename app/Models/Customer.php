<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
    ];

    // un cliente puede tener muchos tickets, relacion uno a muchos
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
