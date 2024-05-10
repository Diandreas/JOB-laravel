<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessionCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'parent_id'
    ];

    public function professions()
    {
        return $this->hasMany(Profession::class);
    }

    public function parent()
    {
        return $this->belongsTo(ProfessionCategory::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(ProfessionCategory::class, 'parent_id');
    }
}
