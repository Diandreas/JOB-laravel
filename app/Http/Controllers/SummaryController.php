<?php

namespace App\Http\Controllers;

use App\Models\Summary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SummaryController extends Controller
{
    public function index()
    {
        $summaries = auth()->user()->summaries; // Récupérer les résumés de l'utilisateur connecté

        return Inertia::render('CvInfos/Summaries/Index', [
            'summaries' => $summaries,
        ]);
    }

    public function create()
    {
        return Inertia::render('CvInfos/Summaries/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string',
        ]);

        $summary = Summary::create($validatedData);

        auth()->user()->summaries()->attach($summary->id); // Associer le résumé à l'utilisateur

        return redirect()->route('summaries.index');
    }

    public function edit(Summary $summary)
    {
        $summary->load('users');
        if ($summary->users->contains(auth()->user())) { // Vérifier si l'utilisateur a accès au résumé
            return Inertia::render('CvInfos/Summaries/Edit', [
                'summary' => $summary,
            ]);
        }

        abort(403, 'Unauthorized'); // Retourner une erreur 403 si l'utilisateur n'a pas accès
    }

    public function update(Request $request, Summary $summary)
    {
        if ($summary->users->contains(auth()->user())) { // Vérifier si l'utilisateur a accès au résumé
            $validatedData = $request->validate([
                'name' => 'required|string|max:100',
                'description' => 'required|string',
            ]);

            $summary->update($validatedData);

            return redirect()->route('summaries.index');
        }

        abort(403, 'Unauthorized');
    }

    public function destroy(Summary $summary)
    {
        if ($summary->users->contains(auth()->user())) { // Vérifier si l'utilisateur a accès au résumé
            $summary->users()->detach(auth()->user()->id); // Supprimer l'association avec l'utilisateur

            // Si aucun autre utilisateur n'est associé, supprimer le résumé
            if ($summary->users->count() === 0) {
                $summary->delete();
            }

            return redirect()->route('summaries.index');
        }

        abort(403, 'Unauthorized');
    }
}
