import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";

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
        <PaginationItem
          className={clsx("", {
            "opacity-60": numberOfPage <= 0,
            "pointer-events-none": numberOfPage <= 0,
          })}
        >
          <PaginationPrevious
            onClick={() => onChangePage(numberOfPage - 1)}
            className="hover:opacity-70 duration-300 cursor-pointer"
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{numberOfPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={clsx("", {
            "opacity-60": (numberOfPage + 1) * limit > maxPage,
            "pointer-events-none": (numberOfPage + 1) * limit > maxPage,
          })}
        >
          <PaginationNext
            onClick={() => onChangePage(numberOfPage + 1)}
            className="hover:opacity-70 duration-300 cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
