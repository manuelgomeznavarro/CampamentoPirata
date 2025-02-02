<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    use HasFactory;
    protected $table = 'children';
    protected $fillable = [
        'name',
        'lastname',
        'birthdate',
        't_shirt_size',
        'alergy_intolerance',
        'aditional_info',
        'acquaintance',
        'group_id',
    ];

    public function inscriptions()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function payments()
    {
        return $this->hasOne(Payment::class);
    }

    public function groups()
    {
        return $this->belongsTo(Group::class);
    }
}

