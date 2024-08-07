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
import { useForm, UseFormReturn } from "react-hook-form";
import { FilePenLine, Trash, ZoomIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { User_Delete, User_Get_All, User_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { removeUser, setUsers, UpdateUser } from "@/Redux/Actions/User";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Upload_Image from "../utils/Upload_Image";
import ButtonLoading from "../buttons/ButtonLoading";
import Loadiner from "@/components/ui/Loadiner";
import clsx from "clsx";
import moment from "moment";
export const UserSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  phoneNumber: z.string().optional(),
  _id: z.string().optional(),
});

export default function User_Table({ searchFilter }: { searchFilter: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const t = useTranslations("UserPage");
  const t_table = useTranslations("table");

  const dispatch = useDispatch();
  const UserData = useSelector(ReduxSelector).User.Body;
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      image: "",
      phoneNumber: "",
    },
  });

  const Get_User = async () => {
    try {
      setIsLoading(true);
      const data = await User_Get_All({ page: page, search: searchFilter });
      dispatch(setUsers(data));
      setPage(0);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: t("GET USERS"),
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const Delete_User = async (_id: string) => {
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        await User_Delete(_id);
        toast({
          title: t("DELETE USER"),
          description: t("User Deleted Successfully"),
          duration: 3000,
        });
        dispatch(removeUser({ _id: _id }));
      }
    } catch (error: any) {
      toast({
        title: t("DELETE USER"),
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const submit = async (value: z.infer<typeof UserSchema>) => {
    try {
      setIsLoading(true);
      const data = await User_Update(value._id || "", value);
      dispatch(UpdateUser(data));
      toast({
        title: t("UPDATE USER"),
        description: t("User Updated Successfully"),
        duration: 3000,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: t("UPDATE USER"),
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    Get_User();
  }, [page]);

  useEffect(() => {
    const set = setTimeout(() => {
      setPage(0);
      Get_User();
    }, 1000);
    return () => clearTimeout(set);
  }, [searchFilter]);
  return (
    <div className="relative">
      <Table
        className={clsx(
          "rounded-xl overflow-hidden border-2 border-teal-600 text-center text-nowrap",
          {
            "opacity-50": isLoading,
            "pointer-events-none": isLoading,
          }
        )}
      >
        <TableHeader className="bg-gray-500/10 ">
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">
              {t_table("JOINING DATE")}
            </TableHead>
            <TableHead className="text-center">{t_table("NAME")}</TableHead>
            <TableHead className="text-center">{t_table("EMAIL")}</TableHead>
            <TableHead className="text-center"> {t_table("PHONE")}</TableHead>
            <TableHead className="text-center">{t_table("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-teal-600">
          {UserData &&
            UserData?.users?.map((item: any, index: number) => {
              return (
                <TableRow key={item._id} className="border-0 border-teal-600">
                  <TableCell>{index}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format("MMMM Do YYYY")}
                  </TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>
                    <SheetControlle
                      variant="ghost"
                      buttonName=""
                      onClick={() => {
                        form.setValue("email", UserData.users[index].email);
                        form.setValue(
                          "fullName",
                          UserData.users[index].fullName
                        );
                        form.setValue("image", UserData.users[index].image);
                        form.setValue(
                          "phoneNumber",
                          UserData.users[index].phoneNumber
                        );
                        form.setValue("_id", item._id);
                      }}
                      size="icon"
                      tital="User"
                      icon={<FilePenLine strokeWidth={1} />}
                    >
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(submit)}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormControl>
                                    <Upload_Image
                                      onChange={field.onChange}
                                      name={t("User Image")}
                                      multiImages={false}
                                      value={field.value}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder={t("fullName")}
                                    {...field}
                                  />
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
                            name="phoneNumber"
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
                          <ButtonLoading
                            name={t("Update User")}
                            loading={form.formState.isSubmitting}
                            className="w-full"
                          />
                        </form>
                      </Form>
                    </SheetControlle>

                    <Button
                      onClick={() => {
                        Delete_User(item._id);
                      }}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <Trash className="text-red-500" strokeWidth={1} />
                    </Button>
                    <Button size={"icon"} variant={"ghost"}>
                      <ZoomIn strokeWidth={1} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter className="bg-gray-500/10 w-full">
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-gray-600/80 dark:text-gray-200/80 text-start"
            >
              {t_table("SHOWING")} {page + 1} OF{" "}
              {Math.ceil(UserData.totalUser / UserData.limit)}
            </TableCell>
            <TableCell colSpan={3}>
              <PaginationComponent
                onChangePage={(value) => {
                  setPage(value);
                }}
                limit={UserData.limit}
                numberOfPage={page}
                maxPage={UserData.totalUser}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {isLoading && <Loadiner />}
    </div>
  );
}
