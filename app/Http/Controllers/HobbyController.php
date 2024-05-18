<?php

namespace App\Http\Controllers;
use App\Models\Hobby;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HobbyController extends Controller
{
    public function index()
    {
        $hobbies = Hobby::all();

        return Inertia::render('Hobbies/Index', ['hobbies' => $hobbies]);
    }

    public function create()
    {
        return Inertia::render('Hobbies/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Hobby::create([
            'name' => $request->name,
        ]);

        return redirect()->route('hobbies.index');
    }

    public function edit(Hobby $hobby)
    {
        return Inertia::render('Hobbies/Edit', ['hobby' => $hobby]);
    }

    public function update(Request $request, Hobby $hobby)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $hobby->update([
            'name' => $request->name,
        ]);

        return redirect()->route('hobbies.index');
    }

    public function destroy(Hobby $hobby)
    {
        $hobby->delete();

        return redirect()->route('hobbies.index');
    }
}
