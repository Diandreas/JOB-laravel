<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreCvInfoRequest;
use App\Http\Requests\UpdateCvInfoRequest;
use App\Models\CvInfo;
use App\Models\Address;
use App\Models\Profession;
use App\Models\Competence;
use App\Models\Hobby;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class CvInfosController extends Controller
{
public function index(): View
{
// TODO: Implement the index method
}

public function create(): View
{
$addresses = Address::all();
$professions = Profession::all();
$competences = Competence::all();
$hobbies = Hobby::all();

return view('cv-infos.create', [
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

public function show(CvInfo $cvInfo): View
{
// TODO: Implement the show method
}

public function edit(CvInfo $cvInfo): View
{
$addresses = Address::all();
$professions = Profession::all();
$competences = Competence::all();
$hobbies = Hobby::all();

return view('cv-infos.edit', [
'cvInfo' => $cvInfo,
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
// TODO: Implement the destroy method
}
}
