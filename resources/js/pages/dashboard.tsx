import CreatePostForm from '@/components/posts/create-post';
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timeline',
        href: '/dashboard',
    },
];
//i want to get props from the server , posts exist inside data object
export default function Dashboard( 
    props: { posts: { data: Post[] } }
) {

    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full w-full flex-1 flex-row justify-center gap-4 rounded-xl p-4">
                <CreatePostForm />
                <div className="flex flex-col gap-4">
                    {props.posts.data.map((post) => (
                        <div key={post.id} className=" ">
                            <div className="flex flex-row gap-2">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-medium text-gray-900">{post.description}</div>
                                    <div className="text-xs text-gray-500">{post.name}</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">{post.ingredients}</div>
                        </div>
                    ))}
                    </div>
            </div>
        </AppLayout>
    );
}
