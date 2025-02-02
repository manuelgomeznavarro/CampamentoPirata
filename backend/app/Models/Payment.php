<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';
    protected $fillable = [
        'payment_date',
        'tutor_id',
        'inscription_id',
        'payment_method',  
        'price_id',
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }

    public function inscriptions()
    {
        return $this->belongsTo(Inscription::class);
    }
    
}
