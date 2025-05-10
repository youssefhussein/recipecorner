import CreatePostForm from '@/components/posts/create-post';
import MyPost from '@/components/posts/postcard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timeline',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full w-full flex-1 flex-row justify-center gap-4 rounded-xl p-4">
                <div>
                    <CreatePostForm />
                    <MyPost></MyPost>
                </div>
            </div>
        </AppLayout>
    );
}
