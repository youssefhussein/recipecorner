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

export default function Dashboard({ posts }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col justify-center gap-4 rounded-xl p-4">
                <CreatePostForm />
                <div className="flex flex-col gap-4">
                    <PostListShow posts={posts} />
                </div>
            </div>
            <PaginateDashboard posts={posts} />
        </AppLayout>
    );
}
