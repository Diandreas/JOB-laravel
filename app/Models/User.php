<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'address_id', // Ajoutez ceci
        'profession_id', // Ajoutez ceci
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cvInfos()
    {
        return $this->hasMany(CvInfo::class);
    }
    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function profession()
    {
        return $this->belongsTo(Profession::class);
    }

    public function models()
    {
        return $this->belongsToMany(Model::class);
    }

    public function competences()
    {
        return $this->belongsToMany(Competence::class,'user_competence', 'user_id', 'competence_id');
    }

//    public function hobbies()
//    {
//        return $this->belongsToMany(Hobby::class);
//    }
    public function hobbies()
    {
        return $this->belongsToMany(Hobby::class, 'user_hobby', 'user_id', 'hobby_id');
    }

    public function experiences()
    {
        return $this->belongsToMany(Experience::class, 'user_experience','user_id','experience_id');
    }

    public function summary()
    {
        return $this->belongsTo(Summary::class);
    }
// Dans votre modèle User

// Dans votre modèle Experience
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}
