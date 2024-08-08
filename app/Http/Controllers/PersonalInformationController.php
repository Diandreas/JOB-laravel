<?php

namespace App\Http\Controllers;

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

        return redirect()->route('personal-information.index');
    }
}
