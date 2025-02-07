<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Admin extends Model
{

    use HasFactory;
    protected $table = 'admins';
    protected $fillable = [
        'name',
        'lastname',
        'dni',
        'phone',
        'phone2'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'role_id')->where('role', 'admin');
    }

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