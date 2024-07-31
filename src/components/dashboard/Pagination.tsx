import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponent({
  numberOfPage = 1,
  maxPage,
  limit,
  onChangePage,
}: {
  numberOfPage?: number;
  maxPage: number;
  limit: number;
  onChangePage: (index: number) => void;
}) {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        {numberOfPage != 0 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onChangePage(numberOfPage - 1)}
              className="hover:opacity-70 duration-300 cursor-pointer"
            />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink>{numberOfPage + 1}</PaginationLink>
        </PaginationItem>
        {((numberOfPage + 1)*limit) < maxPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => onChangePage(numberOfPage + 1)}
              className="hover:opacity-70 duration-300 cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
