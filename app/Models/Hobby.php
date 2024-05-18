<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hobby extends Model
{
    protected $fillable = [
        'name',
    ];

    public static function rules($id = null)
    {
        return [
            'name' => [
                'required',
                Rule::unique('hobbies')->ignore($id),
            ],
        ];
    }
}
