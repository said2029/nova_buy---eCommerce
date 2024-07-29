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
import { useTranslations } from "next-intl";

export default function Products_Table({
  openEdit,
}: {
  openEdit?: () => void;
}) {
  const t = useTranslations("table");
  return (
    <div>
      <Table className="rounded-xl overflow-hidden border-2 border-red-400">
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>{t("PRODUCT NAME")}</TableHead>
            <TableHead>{t("CATEGORY")}</TableHead>
            <TableHead>{t("PRICE")}</TableHead>
            <TableHead>{t("SALE PRICE")}</TableHead>
            <TableHead>{t("STOCK")}</TableHead>
            <TableHead>{t("STATUS")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
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
                <Edit2Icon onClick={openEdit} strokeWidth={1} />
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
