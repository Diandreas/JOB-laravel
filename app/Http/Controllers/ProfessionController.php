<?php

namespace App\Http\Controllers;
use App\Models\Profession;
use App\Models\ProfessionCategory;
use Illuminate\Http\Request;

class ProfessionController extends Controller
{
    public function index()
    {
        $professions = Profession::with('category')->get();

        return Inertia::render('Professions/Index', ['professions' => $professions]);
    }

    public function create()
    {
        $categories = ProfessionCategory::all();

        return Inertia::render('Professions/Create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate(Profession::rules());

        Profession::create($request->all());

        return redirect()->route('professions.index');
    }

    public function edit(Profession $profession)
    {
        $categories = ProfessionCategory::all();

        return Inertia::render('Professions/Edit', ['profession' => $profession, 'categories' => $categories]);
    }

    public function update(Request $request, Profession $profession)
    {
        $request->validate(Profession::rules($profession->id));

        $profession->update($request->all());

        return redirect()->route('professions.index');
    }

    public function destroy(Profession $profession)
    {
        $profession->delete();

        return redirect()->route('professions.index');
    }
}
