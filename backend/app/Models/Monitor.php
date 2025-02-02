<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monitor extends Model
{
    use HasFactory;
    protected $table = 'monitors';
    protected $fillable = [
        'name',
        'lastname',
        'email',
        'dni',
        'phone',
        'phone2',
        'admin_id',
    ];

    public function groups() {
        return $this->belongsTo(Group::class);
    }

    public function admins() {
        return $this->belongsTo(Admin::class);
    }

    public function activities()
    {
        return $this->belongsToMany(Activity::class);
    }

}
