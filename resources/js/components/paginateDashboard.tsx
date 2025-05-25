import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DashboardProps } from '@/types';

export function PaginateDashboard({ posts }: DashboardProps) {
    const { prev_page_url, next_page_url } = posts;
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={prev_page_url ?? '#'} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={next_page_url ?? '#'} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
