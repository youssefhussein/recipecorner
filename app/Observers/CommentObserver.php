<?php

namespace App\Observers;

use App\Models\Comment;
use Illuminate\Support\Facades\Log;

class CommentObserver
{
    /**
     * Handle the Comment "created" event.
     */
    public function created(Comment $comment): void
    {
        Log::info('Comment created: {comment}', ['comment' => $comment]);
    }

    /**
     * Handle the Comment "updated" event.
     */
    public function updated(Comment $comment): void
    {
        Log::info('Comment UPDATED: {comment}', ['comment' => $comment]);

    }

    /**
     * Handle the Comment "deleted" event.
     */
    public function deleted(Comment $comment): void
    {
        Log::warning('Comment DELETED: {comment}', ['comment' => $comment]);
    }

    /**
     * Handle the Comment "restored" event.
     */
    public function restored(Comment $comment): void
    {
        //
    }

    /**
     * Handle the Comment "force deleted" event.
     */
    public function forceDeleted(Comment $comment): void
    {
        Log::alert('Comment FORCE DELETED: {comment}', ['comment' => $comment]);

    }
}
