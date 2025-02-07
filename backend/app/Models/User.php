<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'password',
        'role',
        'role_id'
    ];

    public function roleable()
    {
        if ($this->role === 'tutor') {
            return $this->belongsTo(Tutor::class, 'role_id');
        } elseif ($this->role === 'monitor') {
            return $this->belongsTo(Monitor::class, 'role_id');
        } elseif ($this->role === 'admin') {
            return $this->belongsTo(Admin::class, 'role_id');
        }
    }
}
