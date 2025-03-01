<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendances';
    
    // Since we're using composite key, we need to tell Laravel not to expect an auto-incrementing id
    public $incrementing = false;
    
    // Define the primary keys
    protected $primaryKey = ['activity_id', 'timeline_id', 'date'];
    
    public $timestamps = false;
    
    protected $fillable = [
        'child_id',
        'timeline_id',
        'date',
        'attendance',
        'comments'
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }

    public function timeline()
    {
        return $this->belongsTo(Timeline::class);
    }

}
