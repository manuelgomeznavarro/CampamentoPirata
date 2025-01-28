<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $connection = 'mongodb';
    protected $fillable = ['title', 'content'];
}
