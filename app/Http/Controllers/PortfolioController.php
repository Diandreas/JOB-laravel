<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Portfolio/Index');
    }

    public function show($identifier)
    {
        $user = User::where('username', $identifier)
            ->orWhere('email', $identifier)
            ->firstOrFail();

        $portfolio = $this->getPortfolioData($user);

        return Inertia::render('Portfolio/Show', [
            'portfolio' => $portfolio,
            'identifier' => $user->identifier,
        ]);
    }

    public function edit()
    {
        $user = auth()->user();
        $portfolio = $this->getPortfolioData($user);

        return Inertia::render('Portfolio/Edit', [
            'portfolio' => $portfolio,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        // Validation...

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone,
            'address' => $request->address,
            'github' => $request->github,
            'linkedin' => $request->linkedin,
        ]);

        // Update experiences, competences, hobbies...

        $user->selected_summary()->update([
            'description' => $request->summary,
        ]);

        return redirect()->route('portfolio.edit')->with('success', 'Portfolio mis à jour avec succès.');
    }

    private function getPortfolioData($user)
    {
        return [
            'personalInfo' => [
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
                'phone' => $user->phone_number,
                'address' => $user->address,
                'github' => $user->github,
                'linkedin' => $user->linkedin,
            ],
            'experiences' => $user->experiences()->get(),
            'competences' => $user->competences()->get(),
            'hobbies' => $user->hobbies()->get(),
            'summary' => $user->selected_summary,
        ];
    }
}
