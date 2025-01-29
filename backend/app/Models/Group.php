<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $connection ='mongodb';
    protected $collection = 'groups';
    protected $fillable = [
        'name',
        'administrator_id',
        'monitor_id',
        'timeline_id'
    ];

    public function children()
    {
        return $this->hasMany(Child::class);
    }

    public function administrators()
    {
        return $this->belongsTo( Admin::class);
    }

    public function monitors()
    {
        return $this->hasMany(Monitor::class);
    }

    // TODO: MIRAR SI EL CRONOGRAMA VA A SER DE UN DIA O QUÉ
    public function timelines()
    {
        return $this->belongsTo(Timeline::class);
    }
    
}
