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
import { Edit2Icon, Trash, ZoomIn } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";

export default function SubCategory_Table({
  openEdit,
}: {
  openEdit: () => void;
}) {
  const t = useTranslations("table");
  return (
    <div>
      <Table className="rounded-xl overflow-hidden text-center border-2 border-red-400">
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{t("NAME")}</TableHead>
            <TableHead> {t("DISPLAY NAME")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          <TableRow className="border-0 border-red-400">
            <TableCell>111</TableCell>
            <TableCell>Jessica Justice</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell>
              <Switch className="border-2 border-red-400" />
            </TableCell>
            <TableCell>
              <Button onClick={openEdit} size={"icon"} variant={"ghost"}>
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
              colSpan={2}
              className="text-gray-600/80 dark:text-gray-200/80"
            >
              {("SHOWING")} 1-8 OF 171
            </TableCell>
            <TableCell colSpan={4}>
              <PaginationComponent />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
