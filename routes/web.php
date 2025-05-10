<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect("dashboard");
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('post/create' , function(){
        return Inertia::render("create-post");
    })->name("post.create");
    Route::get('post/{id}' , function($id){
        return Inertia::render("show-post");
    })->name("post.show");
    Route::post('/post/store', [PostController::class, 'store'])->name('post.store');

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
