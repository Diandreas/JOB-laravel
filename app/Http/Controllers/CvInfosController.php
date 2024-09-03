<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCvInfoRequest;
use App\Http\Requests\UpdateCvInfoRequest;
use App\Models\CvInfo;
use App\Models\Address;
use App\Models\ExperienceCategory;
use App\Models\Profession;
use App\Models\Competence;
use App\Models\Hobby;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CvInfosController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $availableCompetences = Competence::all();
        $myProfession=  $user->profession;
        $availableHobbies = Hobby::all();
        $availableProfessions = Profession::all();
        $availableSummaries = $user->summary()->get();
        $experienceCategories = ExperienceCategory::all();

        $cvInformation = [
            'hobbies' => $user->hobbies()->take(3)->get()->toArray(),
            'competences' => $user->competences()->take(3)->get()->toArray(),
            'experiences' => $user->experiences()
                ->join('experience_categories', 'experiences.experience_categories_id', '=', 'experience_categories.id')
                ->select('experiences.*', 'experience_categories.name as category_name')
                ->orderBy('experience_categories.ranking', 'asc')
                ->get()
                ->toArray(),
            'professions' => $user->profession()->take(2)->get()->toArray(),
            'summaries' => $user->selected_summary ? [$user->selected_summary->toArray()] : [],
            'personalInformation' => [
                'id' => $user->id,
                'firstName' => $user->name,
                'email' => $user->email,
                'github' => $user->github,
                'linkedin' => $user->linkedin,
                'address' => $user->address,
                'phone' => $user->phone_number,
            ],
            'availableCompetences' => $availableCompetences->toArray(),
            'availableHobbies' => $availableHobbies->toArray(),
            'availableProfessions' => $availableProfessions->toArray(),
            'availableSummaries' => $availableSummaries->toArray(),
            'myProfession' => $myProfession->toArray(),
            'experienceCategories' => $experienceCategories->toArray(),


        ];

        return Inertia::render('CvInfos/Index', [
            'cvInformation' => $cvInformation,
        ]);
    }
    public function show()
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }
        // Réutiliser le code de la méthode index
        $cvInformation = [
            'hobbies' => $user->hobbies()->take(3)->get()->toArray(),
            'competences' => $user->competences()->take(3)->get()->toArray(),
            'experiences' => $user->experiences()
                ->join('experience_categories', 'experiences.experience_categories_id', '=', 'experience_categories.id')
                ->select('experiences.*', 'experience_categories.name as category_name')
                ->orderBy('experience_categories.ranking', 'asc')
                ->get()
                ->toArray(),
            'professions' => $user->profession()->take(2)->get()->toArray(),
            'summaries' => $user->selected_summary ? [$user->selected_summary->toArray()] : [],
            'personalInformation' => [
                'id' => $user->id,
                'firstName' => $user->name,
                'email' => $user->email,
                'github' => $user->github,
                'linkedin' => $user->linkedin,
                'address' => $user->address,
                'phone' => $user->phone_number,
            ],
        ];

        // Ajouter le modèle CV sélectionné
        $selectedCvModel = $user->selected_cv_model ? $user->selected_cv_model->toArray() : null;

        return Inertia::render('CvInfos/Show', [
            'cvInformation' => $cvInformation,
            'selectedCvModel' => $selectedCvModel,
        ]);
    }



    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
            'github' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
        ]);

        $user = Auth::user();
        $user->update($validatedData);

        // Fetch updated CV information
        $cvInformation = [
            'hobbies' => $user->hobbies()->take(3)->get()->toArray(),
            'competences' => $user->competences()->take(3)->get()->toArray(),
            'experiences' => $user->experiences()
                ->join('experience_categories', 'experiences.experience_categories_id', '=', 'experience_categories.id')
                ->select('experiences.*', 'experience_categories.name as category_name')
                ->orderBy('experience_categories.ranking', 'asc')
                ->get()
                ->toArray(),
            'professions' => $user->profession()->take(2)->get()->toArray(),
            'summaries' => $user->selected_summary ? [$user->selected_summary->toArray()] : [],
            'personalInformation' => [
                'id' => $user->id,
                'firstName' => $user->name,
                'email' => $user->email,
                'github' => $user->github,
                'linkedin' => $user->linkedin,
                'address' => $user->address,
                'phone' => $user->phone_number,
            ],
        ];

        return Inertia::render('CvInfos/Index', [
            'message' => 'Personal information updated successfully',
            'editMode' => false,
            'cvInformation' => $cvInformation, // Include all CV information
        ])->with([
            'message' => 'Personal information updated successfully',
            'editMode' => false
        ]);}

}

