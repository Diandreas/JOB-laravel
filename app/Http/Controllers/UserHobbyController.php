<?php

namespace App\Http\Controllers;

use App\Models\Hobby;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

// app/Http/Controllers/UserHobbyController.php


class UserHobbyController extends Controller
{
    public function index()
    {
        $user = auth()->user(); // Get the authenticated user
        $availableHobbies = Hobby::all();
        // Fetch all available hobbies

        // Fetch the user's hobbies (no need for conditional since auth middleware is likely in place)
        $user_hobbies = $user->hobbies;


        return Inertia::render('CvInfos/Hobbies/Index', [ // Change from 'CvInfos/Index'
            'user_hobbies' => $user_hobbies,
            'availableHobbies' => $availableHobbies, // Correctly pass available hobbies

        ]);
    }

    public function create()
    {
        $availableHobbies = Hobby::all();
        // Remove unnecessary 'auth' as middleware should handle it
        return Inertia::render('CvInfos/Hobbies/Create',[
            'availableHobbies' => $availableHobbies, // Correctly pass available hobbies
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hobby_id' => 'required|exists:hobbies,id', // Validate that the hobby_id exists
        ]);

        $user = auth()->user();
        $hobby = Hobby::find($request->hobby_id); // Find the selected hobby

        $user->hobbies()->attach($hobby);

        return redirect()->route('user-hobbies.index')->with('success', 'Hobby assigned successfully!');
    }

    public function destroy($user_id, $hobby_id)
    {
        $user = User::findOrFail($user_id);
        $hobby = Hobby::findOrFail($hobby_id);

        if ($user->id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $user->hobbies()->detach($hobby);

        return response()->json(['message' => 'Hobby de-assigned successfully!']);
    }

}
