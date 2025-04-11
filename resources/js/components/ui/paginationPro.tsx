import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


import "@/css/paginationPro.css";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TablePaginationProps {
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
    onPageChange: (url: string | null) => void;
}


export function PaginationPro({ from, to, total, links, onPageChange }: TablePaginationProps) {
    return (
        <>
            <div className="pagination-info absolute left-[15px]">
                <span className="pagination-from">{from}</span> a
                <span className="pagination-to">{to}</span> de
                <span className="pagination-total">{total}</span> resultados
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(links[0].url)}
                            className={!links[0].url ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                    {links.slice(1, -1).map((link, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                onClick={() => onPageChange(link.url)}
                                isActive={link.active}
                                className={!link.url ? "pointer-events-none opacity-50" : ""}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(links[links.length - 1].url)}
                            className={!links[links.length - 1].url ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}
