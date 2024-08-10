import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  redirect("/dashboard/home");
  return <div>page</div>;
}
