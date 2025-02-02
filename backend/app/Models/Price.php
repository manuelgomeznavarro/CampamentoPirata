<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $table = 'prices';
    protected $fillable = [
        'name',
        'price',
    ];

    public function payments()
    {
        return $this->belongsTo(Payment::class);
    }
}
