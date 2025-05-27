<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:125',
            'rating' => 'integer|max:5',
            'post_id' => 'required|exists:posts,id',
        ]);

        $post = Post::findOrFail($validated['post_id']);

        $comment = new Comment;
        $comment->body = $validated['body'];
        if ($validated['rating'] >= 1) {
            $comment->rating = $validated['rating'];
        } else {
            $comment->rating = null;
        }
        $comment->user_id = auth()->id();

        // Save the comment using the morphMany relationship
        $post->comments()->save($comment);

        return redirect()->back()->with('success', 'Comment added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
