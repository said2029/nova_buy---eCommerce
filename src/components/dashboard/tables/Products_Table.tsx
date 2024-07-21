"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "../Pagination";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Printer, Trash, View, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Products_Table() {
  return (
    <div>
      <Table className="rounded-xl overflow-hidden border-2 border-red-400">
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>PRODUCT NAME</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>SALE PRICE</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>PUBLISHED</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400  text-center">
          <TableRow className="border-0 border-red-400">
            <TableCell>banana</TableCell>
            <TableCell>Fruits & Vegetable</TableCell>
            <TableCell> $200.00</TableCell>
            <TableCell> $100.00</TableCell>
            <TableCell>$1026.30</TableCell>
            <TableCell>4800</TableCell>
            <TableCell>
              <Badge className="bg-yellow-300 text-white">Selling</Badge>
            </TableCell>
            <TableCell>
              <Button size={"icon"} variant={"ghost"}>
                <Edit2Icon strokeWidth={1} />
              </Button>
              <Button size={"icon"} variant={"ghost"}>
                <Trash className="text-red-500" strokeWidth={1} />
              </Button>
              <Button size={"icon"} variant={"ghost"}>
                <ZoomIn strokeWidth={1} />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="bg-gray-500/10">
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-gray-600/80 dark:text-gray-200/80"
            >
              SHOWING 1-8 OF 171
            </TableCell>
            <TableCell colSpan={6}>
              <PaginationComponent />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
