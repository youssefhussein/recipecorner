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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timeline',
        href: '/dashboard',
    },
];
//next_page_url /dashboard?page=2
//prev_page_url /dashboard?page=1
export default function Dashboard({ posts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="w- flex h-full flex-1 flex-col justify-center gap-4 rounded-xl p-4">
                <CreatePostForm />
                <div className="flex flex-col gap-4">
                    {posts.data.map((post: Post) => (
                        <Card key={post.id} className=" ">
                            <CardHeader>
                                <CardTitle>
                                    <Avatar className="bg-white text-gray-900">
                                        <AvatarFallback className="bg-white text-gray-800">{post.user.name.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </CardTitle>
                                <CardDescription>Recipe title : {post.recipename}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <ul>
                                        <li>{post.ingredients}</li>
                                        <br />
                                        <li>{post.description}</li>
                                    </ul>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Name of your project" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Like</Button>
                                <Button>Comment</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <PaginateDashboard posts={posts}></PaginateDashboard>
        </AppLayout>
    );
}
