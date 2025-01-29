<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'inscriptions';
    protected $fillable = [
        'inscription_date',
        'tutor_id',
        'child_id',
    ];

    public function child()
    {
        return $this->hasOne(Child::class);
    }

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
