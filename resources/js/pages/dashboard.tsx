import { PaginateDashboard } from '@/components/paginateDashboard';
import CommentForm from '@/components/posts/CommentForm';
import CreatePostForm from '@/components/posts/create-post';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, DashboardProps, Post } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timeline',
        href: '/dashboard',
    },

    // {
    //     title: 'My posts',
    //     href: '/Profile',
    // },
];

export default function Dashboard({ posts }: DashboardProps) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col justify-center gap-4 rounded-xl p-4">
                <CreatePostForm />
                <div className="flex flex-col gap-4">
                    {posts.data.map((post: Post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <CardTitle>
                                    <Avatar className="bg-white text-gray-900">
                                        <AvatarFallback className="bg-white text-gray-800">{post.user.name.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </CardTitle>
                                <CardDescription>Recipe title: {post.recipename}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    <CardDescription>Recipe ingredients: {post.ingredients}</CardDescription>
                                    <CardDescription>Recipe description: {post.description}</CardDescription>
                                    <CardDescription>Recipe category: {post.categories}</CardDescription>
                                </ul>
                                <CommentForm postData={post} />
                                <ul>
                                    <li>{post.comments?.at(0)?.user.name}</li>
                                    <li>{post.comments?.at(0)?.body}</li>
                                    <li>{post.comments?.at(0)?.rating}</li>
                                </ul>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={() => handleLike(post.id)}>
                                    Like ({likes[post.id] ?? 0})
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <PaginateDashboard posts={posts} />
        </AppLayout>
    );
}
