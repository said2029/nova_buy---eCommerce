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
import Avater_Image from "../utils/Avater_Image";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function Coupon_Table({ openEdit }: { openEdit?: () => void }) {
  const t = useTranslations("table");
  return (
    <div>
      <Table className="rounded-xl overflow-hidden text-center border-2 border-red-400">
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>{t("CAMPAIGN NAME")}</TableHead>
            <TableHead>{t("CODE")}</TableHead>
            <TableHead>{t("DISCOUNT")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("End Time")}</TableHead>
            <TableHead>{t("STATUS")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          <TableRow className="border-0 border-red-400">
            <TableCell className="flex justify-center items-center gap-1">
              <Avater_Image />
              111
            </TableCell>
            <TableCell>dsf43</TableCell>
            <TableCell>12$</TableCell>
            <TableCell>
              <Switch className="border-2 border-red-400" />
            </TableCell>
            <TableCell>date</TableCell>
            <TableCell>
              <Badge>Active</Badge>
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
              colSpan={4}
              className="text-gray-600/80 text-start dark:text-gray-200/80"
            >
              SHOWING 1-8 OF 171
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
