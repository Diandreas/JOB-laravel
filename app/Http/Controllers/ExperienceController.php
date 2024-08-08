<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\ExperienceCategory;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = auth()->user()->experiences()->with('category')->get();
        return Inertia::render('CvInfos/Experiences/Index', [
            'experiences' => $experiences
        ]);
    }

    public function create()
    {
        $categories = ExperienceCategory::all();
        return Inertia::render('CvInfos/Experiences/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:45',
            'description' => 'nullable|string|max:45',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
            'output' => 'nullable|string|max:45',
            'experience_categories_id' => 'required|exists:experience_categories,id',
            'comment' => 'nullable|string',
            'InstitutionName' => 'nullable|string|max:255',
            'attachment' => 'nullable|file', // Valider le fichier si présent
        ]);

        // Gestion de la pièce jointe (si nécessaire)
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('attachments', 'public'); // Stockez le fichier
            $attachment = Attachment::create([
                'name' => $request->file('attachment')->getClientOriginalName(),
                'path' => $path,
                'format' => $request->file('attachment')->getClientOriginalExtension(),
                'size' => $request->file('attachment')->getSize(),
            ]);
            $validatedData['attachment_id'] = $attachment->id; // Créez un enregistrement Attachment et récupérez son ID
        }

        // Créez l'expérience avec les données validées
        $experience = Experience::create($validatedData);

        // Associez l'expérience à l'utilisateur connecté (si nécessaire)
        auth()->user()->experiences()->attach($experience->id);

        return redirect()->route('experiences.index');
    }

    public function show(Experience $experience)
    {
        $experience->load('category', 'attachment');
        return Inertia::render('CvInfos/Experiences/Show', [
            'experience' => $experience,
        ]);
    }

    public function edit(Experience $experience)
    {
        $categories = ExperienceCategory::all();
        return Inertia::render('CvInfos/Experiences/Edit', [
            'experience' => $experience,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:45',
            'description' => 'nullable|string|max:45',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
            'output' => 'nullable|string|max:45',
            'experience_categories_id' => 'required|exists:experience_categories,id',
            'comment' => 'nullable|string',
            'InstitutionName' => 'nullable|string|max:255',
            'attachment_id' => 'nullable|exists:attachments,id', // Validation de l'attachment
            'attachment' => 'nullable|file', // Valider le fichier si présent
        ]);

        // Gestion de la pièce jointe (si nécessaire)
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('attachments', 'public'); // Stockez le fichier
            $attachment = Attachment::create([
                'name' => $request->file('attachment')->getClientOriginalName(),
                'path' => $path,
                'format' => $request->file('attachment')->getClientOriginalExtension(),
                'size' => $request->file('attachment')->getSize(),
            ]);
            $validated['attachment_id'] = $attachment->id; // Créez un enregistrement Attachment et récupérez son ID
        }

        $experience->update($validated);

        return redirect()->route('experiences.index');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->route('experiences.index');
    }
}
