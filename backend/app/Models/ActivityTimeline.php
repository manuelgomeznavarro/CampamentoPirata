<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityTimeline extends Model
{
    use HasFactory;
    
    protected $table = 'activity_timeline';
    
    // Since we're using composite key, we need to tell Laravel not to expect an auto-incrementing id
    public $incrementing = false;
    
    // Define the primary keys
    protected $primaryKey = ['activity_id', 'timeline_id', 'date', 'hour'];
    
    // Since this is a pivot table, we might not need timestamps
    public $timestamps = false;
    
    protected $fillable = [
        'activity_id',
        'timeline_id',
        'date',
        'hour',
        'duration'
    ];

    // Define relationships
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function timeline()
    {
        return $this->belongsTo(Timeline::class);
    }
}