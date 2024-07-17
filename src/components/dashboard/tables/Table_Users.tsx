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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Delete, Edit2Icon, Printer, Trash, View, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function User_Table() {
  return (
    <div >
      <Table className="rounded-xl overflow-hidden border-2 border-red-400 text-center text-nowrap">
        <TableHeader className="bg-gray-500/10 ">
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">JOINING DATE</TableHead>
            <TableHead className="text-center">NAME</TableHead>
            <TableHead className="text-center">EMAIL</TableHead>
            <TableHead className="text-center">	PHONE</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          <TableRow className="border-0 border-red-400">
            <TableCell>111</TableCell>
            <TableCell>Jul 17, 2024 1:15 PM</TableCell>
            <TableCell>Jessica Justice</TableCell>
            <TableCell>
              <Badge className="bg-yellow-300 text-white">Pending</Badge>
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>Pending</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">
                    <p>Pending</p>
                  </SelectItem>
                  <SelectItem value="Delivered">
                    <p>Delivered</p>
                  </SelectItem>
                  <SelectItem value="Processing">
                    <p>Processing</p>
                  </SelectItem>
                  <SelectItem value="Cancel">
                    <p>Cancel</p>
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button size={'icon'} variant={"ghost"}>
                <Edit2Icon strokeWidth={1}/>
              </Button>
              <Button size={'icon'} variant={"ghost"}>
                <Trash className="text-red-500" strokeWidth={1}/>
              </Button>
              <Button size={'icon'} variant={"ghost"}>
                <ZoomIn strokeWidth={1} />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="bg-gray-500/10 w-full">
          <TableRow >
            <TableCell colSpan={3}  className="text-gray-600/80 dark:text-gray-200/80">SHOWING 1-8 OF 171</TableCell>
            <TableCell colSpan={3}>
              <PaginationComponent />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
