import { PaginateDashboard } from '@/components/paginateDashboard';
import CreatePostForm from '@/components/posts/create-post';
import PostListShow from '@/components/posts/PostListShow';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, DashboardProps } from '@/types';
import { Head } from '@inertiajs/react';

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
                    <PostListShow posts={posts} />
                </div>
            </div>
            <PaginateDashboard posts={posts} />
        </AppLayout>
    );
}
