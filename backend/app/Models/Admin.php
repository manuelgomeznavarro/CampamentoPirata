<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'admin';
    protected $fillable = [
        'name',
        'lastname',
        'email',
        'dni',
        'phone',
        'phone2'
    ];

    public function incidents()
    {
        return $this->hasMany(Incident::class);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function monitors()
    {
        return $this->hasMany(Monitor::class);
    }

    public function timelines()
    {
        return $this->hasMany(Timeline::class);
    }

    
}
