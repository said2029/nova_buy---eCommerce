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
import { Printer, View, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function Order_Table() {
  const t = useTranslations("table");
  return (
    <div>
      <Table className="rounded-xl overflow-hidden border-2 border-red-400">
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>{t("INVOICE NO")}</TableHead>
            <TableHead>{t("ORDER TIME")}</TableHead>
            <TableHead>{t("CUSTOMER NAME")}</TableHead>
            <TableHead>{t("METHOD")}</TableHead>
            <TableHead>{t("AMOUNT")}</TableHead>
            <TableHead>{t("STATUS")}</TableHead>
            <TableHead>{t("ACTION")}</TableHead>
            <TableHead>{t("INVOICE")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          <TableRow className="border-0 border-red-400">
            <TableCell>111</TableCell>
            <TableCell>Jul 17, 2024 1:15 PM</TableCell>
            <TableCell>Jessica Justice</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell>$1026.30</TableCell>
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
              <Button variant={"ghost"}>
                <Printer strokeWidth={1} />
              </Button>
              <Button variant={"ghost"}>
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
              {t("SHOWING")} 1-8 OF 171
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
