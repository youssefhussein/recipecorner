import CommentForm from '@/components/posts/CommentForm';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DashboardProps, Post, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Star, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';

export default function PostListShow({ posts }: DashboardProps) {
    const [likes, setLikes] = useState<{ [postId: number]: number }>(Object.fromEntries(posts.data.map((post) => [post.id, post.likes ?? 0])));
    const handleLike = async (postId: number) => {
        try {
            const response = await axios.post(`/posts/${postId}/like`);

            // Update with the actual value from the server
            setLikes((prev) => ({
                ...prev,
                [postId]: response.data.likes,
            }));
        } catch (error) {
            // Revert the optimistic update on error
            setLikes((prev) => ({
                ...prev,
                [postId]: (prev[postId] ?? 0) - 1, // Revert the increment
            }));
            console.error('Error liking post:', error);
        }
    };
    const { auth }: SharedData = usePage<SharedData>().props;

    // const handleDeleteComment = async (commentID: number) => {
    //     router.post('/comment/delete', { id: commentID });
    // };
    const handleDeletePost = async (postID: number) => {
        router.post(route('posts.destroy'), { postID });
    };
    return (
        <>
            {posts.data.map((post: Post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between" style={{ gap: '1rem' }}>
                            <Avatar className="bg-white text-gray-900">
                                <AvatarFallback className="bg-white text-gray-800">{post.user.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <h2>Recipe title: {post.recipename}</h2>
                            {auth.user.name === post.user.name ? (
                                <Button className="justify-end" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                                    Delete
                                </Button>
                            ) : (
                                <span></span>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <CardDescription>Recipe ingredients: {post.ingredients}</CardDescription>
                            <CardDescription>Recipe description: {post.description}</CardDescription>
                            <CardDescription>Recipe category: {post.categories}</CardDescription>
                        </ul>
                        <CommentForm postData={post} />
                        <ScrollArea className="h-72 min-h-3 w-full rounded-md border">
                            <div className="p-4">
                                <ul>
                                    <h4 className="mb-4 text-sm leading-none font-medium">Comments</h4>
                                    {post.comments?.map((comment) => (
                                        <>
                                            <div key={comment.id} className="flex flex-col gap-1" style={{ listStyle: 'none' }}>
                                                <li>
                                                    <strong>From: </strong> {comment.user.name}
                                                </li>
                                                <li>{comment.body}</li>
                                                <li>
                                                    {comment.rating <= 0 ? (
                                                        <span>No rating</span>
                                                    ) : (
                                                        <span>
                                                            {comment.rating} <Star className="inline-block h-4 w-4" />{' '}
                                                        </span>
                                                    )}
                                                </li>
                                            </div>
                                            <Separator className="my-2" />
                                        </>
                                    ))}
                                </ul>
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => handleLike(post.id)}>
                            <ThumbsUpIcon /> Like ({likes[post.id] ?? 0})
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
}
