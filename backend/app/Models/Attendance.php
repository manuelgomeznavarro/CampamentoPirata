<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendances';
    protected $fillable = [
        'attendance',
        'child_id'
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

}
