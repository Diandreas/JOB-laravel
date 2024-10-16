<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();

        // Récupérer toutes les informations nécessaires pour le portfolio
        $portfolio = [
            'personalInfo' => $user->personalInformation,
            'experiences' => $user->experiences,
            'competences' => $user->competences,
            'hobbies' => $user->hobbies,
            'summaries' => $user->summaries,
            // Ajoutez d'autres informations pertinentes ici
        ];

        return Inertia::render('Portfolio/Show', [
            'portfolio' => $portfolio,
            'username' => $username,
        ]);
    }

    public function edit()
    {
        $user = auth()->user();

        $portfolio = [
            'personalInfo' => $user->personalInformation,
            'design' => $user->portfolioDesign,
            // Ajoutez d'autres informations personnalisables ici
        ];

        return Inertia::render('Portfolio/Edit', [
            'portfolio' => $portfolio,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        // Validez et mettez à jour les informations du portfolio
        $validated = $request->validate([
            'design' => 'sometimes|array',
            // Ajoutez d'autres règles de validation ici
        ]);

        $user->portfolioDesign()->update($validated['design']);
        // Mettez à jour d'autres informations personnalisables ici

        return redirect()->route('portfolio.edit')->with('success', 'Portfolio mis à jour avec succès.');
    }
}
