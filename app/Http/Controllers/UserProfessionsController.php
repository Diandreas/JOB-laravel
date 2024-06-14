<?php

namespace App\Http\Controllers;
use App\Models\Profession;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserProfessionsController extends Controller
{
    // Afficher la liste des professions d'un utilisateur
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('CvInfos/Professions/Index', [
            'user_professions' => $user->professions
        ]);
    }

    // Afficher le formulaire de création de profession
    public function create()
    {
        $user = Auth::user();

        // Exclure les professions déjà assignées à l'utilisateur
        $availableProfessions = Profession::whereDoesntHave('users', function ($query) use ($user) {
            $query->where('users.id', $user->id);
        })->get();

        return Inertia::render('CvInfos/Professions/Create', [
            'availableProfessions' => $availableProfessions,
            'auth' => [
                'user' => $user,
            ],
        ]);
    }


    // Assigner une profession à un utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'profession_id' => ['required', 'exists:professions,id'],
        ]);

        $user = Auth::user();
        $user->professions()->attach($request->profession_id);

        return redirect()->route('user-professions.index');
    }

    // Désassigner une profession d'un utilisateur
    public function destroy(User $user, Profession $profession)
    {
        if ($user->id !== Auth::id()) {
            abort(403); // L'utilisateur ne peut modifier que ses propres professions
        }

        $user->professions()->detach($profession->id);

        return redirect()->back();
    }
}
