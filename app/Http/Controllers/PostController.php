<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *    / or /posts
     */
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(5);
        return Inertia::render('dashboard', [
            'posts' => $posts->through(
                fn($post) => [
                    'id' => $post->id,
                    'recipename' => $post->recipename,
                    'ingredients' => $post->ingredients,
                    'description' => $post->description,
                    'categories' => $post->categories,
                    'user' => [
                        'name' => $post->user->name,
                    ],
                ]),
        ]);
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
        ]);

        if (!$validated) {
            return redirect()->route('password.edit')->with("fai;l");
        }

        $user = Auth::user();
        $user->posts()->create(
            $request->all()
        );

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
