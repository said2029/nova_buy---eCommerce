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
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";

export default function OurStaff_Table({openEdit}:{openEdit:()=>void}) {
  const t= useTranslations("table");
  return (
    <div>
      <Table className="rounded-xl overflow-hidden border-2 border-red-400 text-center text-nowrap">
        <TableHeader className="bg-gray-500/10 ">
          <TableRow>
            <TableHead className="text-center">{t("NAME")}</TableHead>
            <TableHead className="text-center">{t("EMAIL")}</TableHead>
            <TableHead className="text-center">{t("CONTACT")}</TableHead>
            <TableHead className="text-center">{t("JOINING DATE")}</TableHead>
            <TableHead className="text-center">{t("ROLE")}</TableHead>
            <TableHead className="text-center"> {t("STATUS")}</TableHead>
            <TableHead className="text-center"> {t("PUBLISHED")}</TableHead>
            <TableHead className="text-center">{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          <TableRow className="border-0 border-red-400">
            <TableCell>Said</TableCell>
            <TableCell>manojrajput0547@gmail.com</TableCell>
            <TableCell>+2342343</TableCell>
            <TableCell>Jul 17, 2024 1:15 PM</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>
              <Badge>Inactive</Badge>
            </TableCell>
            <TableCell>
              <Switch className="border-2 peer border-red-400 peer-checked:border-teal-400" />
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
        <TableFooter className="bg-gray-500/10 w-full">
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-gray-600/80 dark:text-gray-200/80 text-start"
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
