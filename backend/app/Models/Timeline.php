<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;
    protected $table = 'timelines';
    protected $fillable = [
        'admin_id',
    ];

    public function admins()
    {
        return $this->belongsTo(Admin::class);
    }
    
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}