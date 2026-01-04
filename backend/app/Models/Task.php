<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'board_id',
        'status',
    ];

    public function board()
    {
        return $this->belongsTo(Board::class);
    }
}
