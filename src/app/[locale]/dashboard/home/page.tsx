import Cart_dashboard from "@/components/dashboard/Carts/Cart_dashboard";
import Bast_Products_Chart from "@/components/dashboard/Chart/Bast_Products_Chart";
import Order_Chart from "@/components/dashboard/Chart/Order_Chart_Line";
import Order_Table from "@/components/dashboard/tables/Order_Table";
import {
  BringToFront,
  ClockArrowDown,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Dashboard_get } from "@/Actions/quires";

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {

  const t = await getTranslations({ locale, namespace: "dashboard" });
  const Dashboard_data = await Dashboard_get();
  return (
    <>
      <div className="p-7 mt-3">
        {/*  Summary */}

        <div className=" py-5 dark:bg-gray-700/25  rounded-md border-2 border-background border-dashed">
          <h1 className="border-s-4 text-xl text-primary/75 border-red-500 ps-4 font-semibold">
            {t("Summary")}
          </h1>
          <section className="mt-11 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 md:px-7 xl:grid-cols-4">
            <Cart_dashboard
              currency={"$" + Dashboard_data.summary.today}
              shadowColor={"shadow-red-400"}
              titel={t("Today Orders")}
              Icon={<ClockArrowDown size={200} strokeWidth={1} />}
            />
            <Cart_dashboard
              currency={"$" + Dashboard_data.summary.Yesterday}
              shadowColor={"shadow-sky-400"}
              titel={t("Yesterday Orders")}
              Icon={<BringToFront size={200} strokeWidth={1} />}
            />
            <Cart_dashboard
              currency={"$" + Dashboard_data.summary.ThisMonth}
              shadowColor={"shadow-blue-400"}
              titel={t("This Month")}
              Icon={<ShoppingCart size={200} strokeWidth={1} />}
            />
            <Cart_dashboard
              currency={"$" + Dashboard_data.summary.LastMonth}
              shadowColor={"shadow-yellow-400"}
              titel={t("Last Month")}
              Icon={<ShoppingBag size={200} strokeWidth={1} />}
            />
          </section>
        </div>
        {/*  Order Status */}
        <div className=" py-5 mt-7 dark:bg-gray-700/25 border-2 border-background border-dashed rounded-md">
          <h1 className="border-s-4 text-xl text-primary/75 border-red-500 ps-4 font-semibold">
            {t("Order Status")}
          </h1>
          <section className="mt-11 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 md:px-7 xl:grid-cols-4">
            <Cart_dashboard
              currency={Dashboard_data.orderStatus.Pending.length}
              shadowColor={"shadow-green-400"}
              titel={t("Pending Order")}
              image="/images/Icons/checklist.png"
            />
            <Cart_dashboard
              currency={Dashboard_data.orderStatus.Processing.length}
              shadowColor={"shadow-sky-400"}
              titel={t("Processing Order")}
              image="/images/Icons/order-processed.png"
            />
            <Cart_dashboard
              currency={Dashboard_data.orderStatus.Delivered.length}
              shadowColor={"shadow-red-400"}
              titel={t("Completed Order")}
              image="/images/Icons/completed-task.png"
            />
            <Cart_dashboard
              currency={Dashboard_data.orderStatus.Cancel.length}
              shadowColor={"shadow-blue-400"}
              titel={t("Cancelled Order")}
              image="/images/Icons/delivery-cancelled.png"
            />
          </section>
        </div>
        {/* Chart */}
        <div className=" py-5 mt-7 dark:bg-gray-700/25 border-2 border-background border-dashed rounded-md">
          <h1 className="border-s-4 text-xl text-primary/75 border-red-500 ps-4 font-semibold">
            {t("Chart")}
          </h1>
          <section className="mt-11 grid grid-cols-1 lg:grid-cols-2  gap-6 px-2 sm:px-7">
            <div className="bg-background/10  rounded-md sm:p-3">
              <h1 className="border-s-4 text-primary/75 border-red-500 ps-4 font-semibold">
                {t("Weekly sales")}
              </h1>
              <Order_Chart
                OrderData={Dashboard_data.WeeklySales.orders}
                SaleData={Dashboard_data.WeeklySales.sale}
                label={Dashboard_data.WeeklySales.Labels}
              />
            </div>
            <div className="bg-background/10 rounded-md sm:p-3">
              <h1 className="border-s-4 text-primary/75 border-red-500 ps-4 font-semibold">
                {t("Best Selling Products")}
              </h1>
              <Bast_Products_Chart
                Data={Dashboard_data.best_Products.values}
                labels={Dashboard_data.best_Products.lables}
              />
            </div>
          </section>
        </div>
        {/* Recent Order */}

        <div className=" py-5 mt-7 dark:bg-gray-700/25 border-2 border-background border-dashed rounded-md">
          <h1 className="border-s-4 text-xl text-primary/75 border-red-500 ps-4 font-semibold">
            {t("Recent Order")}
          </h1>
          <section className="mt-11 px-3">
            <Order_Table
              FilterData={{
                search: "",
                paymentMethod: "",
                status: "",
                startDate: "",
                endDate: "",
              }}
            />
          </section>
        </div>
      </div>
    </>
  );
}
