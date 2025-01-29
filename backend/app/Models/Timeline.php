<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'timelines';
    protected $fillable = [
        'date',
        'admin_id',
    ];

    public function admins()
    {
        return $this->belongsTo(Admin::class);
    }

    public function activities()
    {
        return $this->belongsToMany(Activity::class);
    }
}
