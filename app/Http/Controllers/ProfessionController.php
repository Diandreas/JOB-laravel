<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use Inertia\Inertia;

class ProfessionController extends Controller
{
    public function index()
    {
        $professions = Profession::all();

        return Inertia::render('Register', ['professions' => $professions]);
    }
}
