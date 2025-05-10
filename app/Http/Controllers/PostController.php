<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *    / or /posts
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
      $validated = $request->validate([
        'recipename' => 'required|string|max:255',
        'ingredients' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'categories' => 'required|string|max:255',
        'user_id' => 'required|integer'
      ]);

      if(!$validated){
        return redirect()->route('password.edit')->with("fai;l");
      }
      
      Post::create($validated);

      return redirect()->route('dashboard')->with('success', 'Ninja created!');
    }

    

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
