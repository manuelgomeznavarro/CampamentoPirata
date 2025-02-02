<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;
    protected $table = 'incidents';
    protected $fillable = [
        'title',
        'subject',
        'date',
        'status',
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

