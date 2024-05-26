<?php

// app/Http/Controllers/UserCompetenceController.php

namespace App\Http\Controllers;

use App\Models\Competence;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserCompetenceController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $availableCompetences = Competence::all();
        $user_competences = $user->competences;

        return Inertia::render('CvInfos/Competences/Index', [
            'user_competences' => $user_competences,
            'availableCompetences' => $availableCompetences,
        ]);
    }

    public function create()
    {
        $availableCompetences = Competence::all();
        return Inertia::render('CvInfos/Competences/Create', [
            'availableCompetences' => $availableCompetences,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'competence_id' => 'required|exists:competences,id',
        ]);

        $user = auth()->user();
        $competence = Competence::find($request->competence_id);

        $user->competences()->attach($competence);

        return redirect()->route('user-competences.index')->with('success', 'Competence assigned successfully!');
    }

    public function destroy($user_id, $competence_id)
    {
        $user = User::findOrFail($user_id);
        $competence = Competence::findOrFail($competence_id);

        if ($user->id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $user->competences()->detach($competence);

        return response()->json(['message' => 'Competence de-assigned successfully!']);
    }
}
