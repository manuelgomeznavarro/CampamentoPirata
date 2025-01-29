<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'incidents';
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
