<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect("dashboard");
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [PostController::class , 'index'])->name('dashboard');
    Route::get('post/create' , function(){
        return Inertia::render("create-post");
    })->name("post.create");
    Route::get('post/{id}' , function($id){
        return Inertia::render("show-post");
    })->name("post.show");
    Route::post('/post/store', [PostController::class, 'store'])->name('post.store');

    Route::get('/posts/search', [PostController::class, 'search'])->name('posts.search');
    Route::get('/posts/filter', [PostController::class, 'filter'])->name('posts.filter');
    Route::post('/posts/{id}/like', [PostController::class, 'like'])->name('posts.like');


});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
