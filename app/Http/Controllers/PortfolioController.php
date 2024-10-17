<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PortfolioSettings;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $settings = $user->portfolioSettings ?? new PortfolioSettings();

        return Inertia::render('Portfolio/Edit', [
            'portfolio' => $portfolio,
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        // Validation...
        $request->validate([
            'design' => 'required|in:intuitive,professional,user-friendly',
            'show_experiences' => 'boolean',
            'show_competences' => 'boolean',
            'show_hobbies' => 'boolean',
            'show_summary' => 'boolean',
            'show_contact_info' => 'boolean',
            'profile_picture' => 'nullable|image|max:1024', // 1MB Max
        ]);

        // Update portfolio settings
        $user->portfolioSettings()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'design',
                'show_experiences',
                'show_competences',
                'show_hobbies',
                'show_summary',
                'show_contact_info',
            ])
        );

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $user->update(['profile_picture' => $path]);
        }

        return redirect()->route('portfolio.edit')->with('success', 'Portfolio mis à jour avec succès.');
    }

    private function getPortfolioData($user)
    {
        $settings = $user->portfolioSettings;

        return [
            'personalInfo' => [
                'name' => $user->name,
                'email' => $user->email,
                'username' => $user->username,
                'phone' => $user->phone_number,
                'address' => $user->address,
                'github' => $user->github,
                'linkedin' => $user->linkedin,
                'profile_picture' => $user->profile_picture ? Storage::url($user->profile_picture) : null,
            ],
            'experiences' => $settings->show_experiences ? $user->experiences : [],
            'competences' => $settings->show_competences ? $user->competences : [],
            'hobbies' => $settings->show_hobbies ? $user->hobbies : [],
            'summary' => $settings->show_summary ? $user->selected_summary : null,
            'design' => $settings->design,
            'show_contact_info' => $settings->show_contact_info,
            'show_experiences' => $settings->show_experiences,
            'show_competences' => $settings->show_competences,
            'show_hobbies' => $settings->show_hobbies,
            'show_summary' => $settings->show_summary,
        ];
    }

    private function createDefaultSettings($user)
    {
        return $user->portfolioSettings()->create([
            'design' => 'professional',
            'show_experiences' => true,
            'show_competences' => true,
            'show_hobbies' => true,
            'show_summary' => true,
            'show_contact_info' => true,
        ]);
    }
}