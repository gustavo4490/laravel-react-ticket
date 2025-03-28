<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Support extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'speciality',
    ];

    // un tecnico de soporte puede tener muchos tickets, relacion uno a muchos
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
    
}
