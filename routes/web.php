<?php

use App\Http\Controllers\ExperienceCategoryController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\AddressController;
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
    Route::resource('cv', CVController::class);
    Route::get('/cv/create', function () {
        return Inertia::render('CvInfos/Create');
    })->name('cv.create');

    Route::resource('experience-categories', ExperienceCategoryController::class);
});

require __DIR__.'/auth.php';
