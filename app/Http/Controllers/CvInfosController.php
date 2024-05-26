<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreCvInfoRequest;
use App\Http\Requests\UpdateCvInfoRequest;
use App\Models\CvInfo;
use App\Models\Address;
use App\Models\Profession;
use App\Models\Competence;
use App\Models\Hobby;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CvInfosController extends Controller
{
    public function index(): Response
    {


        return Inertia::render('CvInfos/Index');
    }

    public function create(): Response
    {
        $addresses = Address::all();
        $professions = Profession::all();
        $competences = Competence::all();
        $hobbies = Hobby::all();

        return Inertia::render('CvInfos/Create', [
            'addresses' => $addresses,
            'professions' => $professions,
            'competences' => $competences,
            'hobbies' => $hobbies,
        ]);
    }

    public function store(StoreCvInfoRequest $request): RedirectResponse
    {
        // Create a new CvInfo instance
        $cvInfo = CvInfo::create($request->validated());

        // Sync the competences, hobbies, summaries, and experiences
        $cvInfo->competences()->sync($request->input('competences', []));
        $cvInfo->hobbies()->sync($request->input('hobbies', []));
        $cvInfo->summaries()->saveMany($request->input('summaries', []));
        $cvInfo->experiences()->saveMany($request->input('experiences', []));

        // Redirect to the CvInfos index page with a success message
        return redirect()->route('cv-infos.index')->with('success', 'CvInfo has been created successfully.');
    }

    public function show(CvInfo $cvInfo): Response
    {
        return Inertia::render('CvInfos/Show', ['cvInfo' => $cvInfo->load(['address', 'profession', 'competences', 'hobbies', 'summaries', 'experiences'])]);
    }

    public function edit(CvInfo $cvInfo): Response
    {
        $addresses = Address::all();
        $professions = Profession::all();
        $competences = Competence::all();
        $hobbies = Hobby::all();

        return Inertia::render('CvInfos/Edit', [
            'cvInfo' => $cvInfo->load(['address', 'profession', 'competences', 'hobbies', 'summaries', 'experiences']),
            'addresses' => $addresses,
            'professions' => $professions,
            'competences' => $competences,
            'hobbies' => $hobbies,
        ]);
    }

    public function update(UpdateCvInfoRequest $request, CvInfo $cvInfo): RedirectResponse
    {
        // Update the CvInfo instance
        $cvInfo->update($request->validated());

        // Sync the competences, hobbies, summaries, and experiences
        $cvInfo->competences()->sync($request->input('competences', []));
        $cvInfo->hobbies()->sync($request->input('hobbies', []));
        $cvInfo->summaries()->saveMany($request->input('summaries', []));
        $cvInfo->experiences()->saveMany($request->input('experiences', []));

        // Redirect to the CvInfos index page with a success message
        return redirect()->route('cv-infos.index')->with('success', 'CvInfo has been updated successfully.');
    }

    public function destroy(CvInfo $cvInfo): RedirectResponse
    {
        // Delete the CvInfo instance
        $cvInfo->delete();

        // Redirect to the CvInfos index page with a success message
        return redirect()->route('cv-infos.index')->with('success', 'CvInfo has been deleted successfully.');
    }
}
