<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{

    //Representación de la tabla en la base de datos en una clase de PHP
    use HasFactory;
    protected $table = 'incidents';
    protected $fillable = [
        'subject',
        'description',
        'date',
        'status',
        'admin_response',
        'tutor_id',
        'admin_id'
    ];

    public function tutors()
    {
    return $this->belongsTo(Tutor::class);
    }

    public function admins()
    {
        return $this->belongsTo(Admin::class);
    }
}

