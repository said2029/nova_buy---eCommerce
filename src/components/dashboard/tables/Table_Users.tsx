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
import { SheetControlle } from "../SheetProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { UserSchema } from "@/app/[locale]/dashboard/home/users/page";
import { Edit2Icon, Trash, ZoomIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function User_Table({
  form,
}: {
  form: UseFormReturn<Zod.infer<typeof UserSchema>>;
}) {
  const t = useTranslations("UserPage");
  const t_table = useTranslations("table");
  return (
    <div>
      <Table className="rounded-xl overflow-hidden border-2 border-red-400 text-center text-nowrap">
        <TableHeader className="bg-gray-500/10 ">
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">{t_table("JOINING DATE")}</TableHead>
            <TableHead className="text-center">{t_table("NAME")}</TableHead>
            <TableHead className="text-center">{t_table("EMAIL")}</TableHead>
            <TableHead className="text-center"> {t_table("PHONE")}</TableHead>
            <TableHead className="text-center">{t_table("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          <TableRow className="border-0 border-red-400">
            <TableCell>111</TableCell>
            <TableCell>Jul 17, 2024 1:15 PM</TableCell>
            <TableCell>Jessica Justice</TableCell>
            <TableCell>manojrajput0547@gmail.com</TableCell>
            <TableCell>+2342343</TableCell>
            <TableCell>
              <SheetControlle
                variant="ghost"
                buttonName=""
                size="icon"
                tital="User"
                icon={<Edit2Icon strokeWidth={1} />}
              >
                <Form {...form}>
                  <form className="space-y-6" action="">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={t("fullName")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("email")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={t("phone")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder={t("address")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      {t("Update Coupon")}
                    </Button>
                  </form>
                </Form>
              </SheetControlle>

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
              colSpan={3}
              className="text-gray-600/80 dark:text-gray-200/80 text-start"
            >
              {t_table("SHOWING")} 1-8 OF 171
            </TableCell>
            <TableCell colSpan={3}>
              <PaginationComponent />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
