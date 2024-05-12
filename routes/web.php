<?php

use App\Http\Controllers\CVController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\AddressController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/us', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('announce.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/register', [ProfessionController::class, 'index']);
Route::get('/register', [AddressController::class, 'index']);

//cv information
Route::resource('cv', CVController::class);
Route::get('/cv/create', function () {
    return Inertia::render('CvInfos/Create');
})->name('cv.create');

require __DIR__.'/auth.php';
