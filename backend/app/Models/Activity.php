<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'activities';
    protected $fillable = [
        'name',
        'description',
        'duration'
    ];

    public function timelines()
    {
        return $this->belongsToMany(Timeline::class);
    }

    public function monitors()
    {
        return $this->belongsToMany(Monitor::class);
    }
}
