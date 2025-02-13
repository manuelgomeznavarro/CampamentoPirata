<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{
    use HasFactory;
    protected $table = 'tutors';
    protected $fillable = [
        'id',
        'name',
        'lastname',
        'dni',
        'phone',
        'phone2',
        'city',
        'postal_code',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'role_id')->where('role', 'tutor');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function incidents()
    {
        return $this->hasMany(Incident::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
