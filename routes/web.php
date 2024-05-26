<?php

use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\CvInfosController;
use App\Http\Controllers\ExperienceCategoryController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\HobbyController;
use App\Http\Controllers\ProfessionCategoryController;
use App\Http\Controllers\ProfessionMissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\UserCompetenceController;
use App\Http\Controllers\UserHobbyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //cv information
    Route::resource('cv-infos', CvInfosController::class);
    Route::resource('experience-categories', ExperienceCategoryController::class);
    Route::resource('hobbies', HobbyController::class);
    Route::resource('profession-categories', ProfessionCategoryController::class);
    Route::resource('professions', ProfessionController::class);
    Route::resource('competences', CompetenceController::class);
    Route::resource('profession-missions', ProfessionMissionController::class);
    Route::get('/user-hobbies', [UserHobbyController::class, 'index'])->name('user-hobbies.index');
    Route::get('/user-hobbies/create', [UserHobbyController::class, 'create'])->name('user-hobbies.create');
    Route::post('/user-hobbies', [UserHobbyController::class, 'store'])->name('user-hobbies.store');
    Route::delete('/user-hobbies/{user_id}/{hobby_id}', [UserHobbyController::class, 'destroy'])->name('user-hobbies.destroy');
    Route::resource('user-competences', UserCompetenceController::class)->except(['edit', 'update', 'show']);
    Route::delete('/user-competences/{user_id}/{competence_id}', [UserCompetenceController::class, 'destroy'])->name('user-competences.destroy');


});

Route::get('/us', function () {
    return Inertia::render('Welcome');
})->middleware(['auth', 'verified'])->name('WELCOME');

require __DIR__.'/auth.php';
