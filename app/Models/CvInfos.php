<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CvInfos extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'marital_status',
        'hobbies',
        'summary',
        'status',
    ];

    // Relation avec User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec UserExperience
    public function userExperiences()
    {
        return $this->hasMany(UserExperience::class);
    }

    // Relation avec UserEducation
    public function userEducations()
    {
        return $this->hasMany(UserEducation::class);
    }

    // Relation avec UserCompetence
    public function userCompetences()
    {
        return $this->hasMany(UserCompetence::class);
    }

    // Relation avec UserHobby
    public function userHobbies()
    {
        return $this->hasMany(UserHobby::class);
    }
}
