import { PaginateDashboard } from '@/components/paginateDashboard';
import CreatePostForm from '@/components/posts/create-post';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, DashboardProps, Post } from '@/types';
import { Head } from '@inertiajs/react';
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

export default function Profile({ posts }: DashboardProps) {
    const [likes] = useState<{ [postId: number]: number }>(Object.fromEntries(posts.data.map((post) => [post.id, post.likes ?? 0])));

    // const handleLike = async (postId: number) => {
    //     try {
    //         setLikes((prev) => ({
    //             ...prev,
    //             [postId]: (prev[postId] ?? 0) + 1,
    //         }));

    //         await axios.post(`/posts/${postId}/like`);
    //     } catch (error) {
    //         console.error('Error liking post:', error);
    //     }
    // };

    if (posts.total == 0) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Profile', href: '/profile' }]}>
                <Head title="Your Posts" />
                <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">You haven’t posted anything yet</h2>
                    <p className="max-w-md text-gray-500">No worries — you can start by creating your very first post below!</p>
                    <div className="w-full max-w-xl">
                        <CreatePostForm />
                    </div>
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col justify-center gap-4 rounded-xl p-4">
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
                                <div className="mt-4 flex flex-col space-y-1.5">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Input id="comment" placeholder="Leave your Comment here" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button>Like ({likes[post.id]})</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <PaginateDashboard posts={posts} />
        </AppLayout>
    );
}
