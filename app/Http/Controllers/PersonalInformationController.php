<?php

namespace App\Http\Controllers;

use App\Models\Competence;
use App\Models\Hobby;
use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonalInformationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('CvInfos/PersonalInformation/Index', [
            'user' => $user
        ]);
    }

    public function edit()
    {
        $user = Auth::user();
        return Inertia::render('CvInfos/PersonalInformation/Edit', [
            'user' => $user
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
        $availableCompetences = Competence::all();
        $myProfession=  $user->profession;
        $availableHobbies = Hobby::all();
        $availableProfessions = Profession::all();
        $availableSummaries = $user->summary()->get();

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
