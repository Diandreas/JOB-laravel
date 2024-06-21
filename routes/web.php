<?php

use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\CvGalleryController;
use App\Http\Controllers\CvInfosController;
use App\Http\Controllers\ExperienceCategoryController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HobbyController;
use App\Http\Controllers\PersonalInformationController;
use App\Http\Controllers\ProfessionCategoryController;
use App\Http\Controllers\ProfessionMissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\UserCompetenceController;
use App\Http\Controllers\UserHobbyController;
use App\Http\Controllers\UserProfessionsController;
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
    Route::get('/cv-infos/show', [CvInfosController::class, 'show'])->name('cv-infos.show');
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



    // experience
    Route::get('/experiences', [ExperienceController::class, 'index'])->name('experiences.index');
    Route::get('/experiences/create', [ExperienceController::class, 'create'])->name('experiences.create');
    Route::post('/experiences', [ExperienceController::class, 'store'])->name('experiences.store');
    Route::get('/experiences/{experience}/edit', [ExperienceController::class, 'edit'])->name('experiences.edit');
    Route::put('/experiences/{experience}', [ExperienceController::class, 'update'])->name('experiences.update');
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');
    //summary
    Route::resource('summaries', SummaryController::class);

    //Personnal nformation
    Route::get('/personal-information', [PersonalInformationController::class, 'index'])->name('personal-information.index');
    Route::get('/personal-information/edit', [PersonalInformationController::class, 'edit'])->name('personal-information.edit');
    Route::put('/personal-information', [PersonalInformationController::class, 'update'])->name('personal-information.update');

    //user profession
    Route::get('/user-professions', [UserProfessionsController::class, 'index'])->name('user-professions.index');
    Route::get('/user-professions/create', [UserProfessionsController::class, 'create'])->name('user-professions.create');
    Route::post('/user-professions', [UserProfessionsController::class, 'store'])->name('user-professions.store');
    Route::delete('/user-professions/{user}/{profession}', [UserProfessionsController::class, 'destroy'])->name('user-professions.destroy');

    //cv - gallery
//    Route::get('/cv-gallery', [CvGalleryController::class, 'index'])->name('cv-gallery.index');
//    Route::get('/cv-gallery/{modelViewPath}', [CvGalleryController::class, 'show'])->name('cv-gallery.show');

    //
    Route::get('/cv-gallery/canadian', function () {
        return Inertia::render('CvGallery/Canadian');
    });


});

Route::get('/us', function () {
    return Inertia::render('Welcome');
})->middleware(['auth', 'verified'])->name('WELCOME');

require __DIR__.'/auth.php';
