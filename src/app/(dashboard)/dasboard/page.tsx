import { Bast_Products_Chart } from "@/components/dashboard/Chart/Bast_Products_Chart";
import Cart_dashboard from "@/components/dashboard/Carts/Cart_dashboard";
import { Order_Chart } from "@/components/dashboard/Chart/Order_Chart_Line";
import Order_Table from "@/components/dashboard/tables/Order_Table";
import { BringToFront, ClockArrowDown, ShoppingBag, ShoppingCart } from "lucide-react";

export default function page() {
  return (
    <>
      <div className="p-7 mt-3">
        {/*  Summary */}

        <div className=" py-5 dark:bg-slate-800 bg-background  rounded-md">
          <h1 className="border-s-4 border-red-500 ps-4 font-semibold">
            Summary
          </h1>
          <section className="mt-11 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 md:px-7 xl:grid-cols-4">
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-red-400"}
              titel={"Today Orders"}
              Icon={<ClockArrowDown size={200} strokeWidth={1}/>}
            />
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-sky-400"}
              titel={"Yesterday Orders"}
              Icon={<BringToFront size={200} strokeWidth={1}/>}
            />
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-blue-400"}
              titel={"This Month"}
              Icon={<ShoppingCart size={200} strokeWidth={1}/>}
            />
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-yellow-400"}
              titel={"Last Month"}
              Icon={<ShoppingBag size={200} strokeWidth={1}/>}
            />
          </section>
        </div>
        {/*  Order Status */}
        <div className=" py-5 mt-7 dark:bg-slate-800 bg-background rounded-md">
          <h1 className="border-s-4 border-red-500 ps-4 font-semibold">
            Order Status
          </h1>
          <section className="mt-11 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 md:px-7 xl:grid-cols-4">
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-green-400"}
              titel={"Pending Order"}
              image="/images/Icons/checklist.png"
            />
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-sky-400"}
              titel={"Processing Order"}
              image="/images/Icons/order-processed.png"
            />
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-red-400"}
              titel={"Completed Order"}
              image="/images/Icons/completed-task.png"
            />
            <Cart_dashboard
              currency={"12312"}
              shadowColor={"shadow-blue-400"}
              titel={"Cancelled Order"}
              image="/images/Icons/delivery-cancelled.png"
            />
          </section>
        </div>
        {/* Chart */}
        <div className=" py-5 mt-7 dark:bg-slate-800 bg-background rounded-md">
          <h1 className="border-s-4 border-red-500 ps-4 font-semibold">
            Chart
          </h1>
          <section className="mt-11 grid grid-cols-1 md:grid-cols-2  gap-2 px-7">
            <div className="bg-background rounded-md p-3">
              <h1 className="border-s-4 border-red-500 ps-4 font-semibold">
                Weekly Sales
              </h1>
              <Order_Chart />
            </div>
            <div className="bg-background rounded-md p-3">
              <h1 className="border-s-4 border-red-500 ps-4 font-semibold">
                Best Selling Products
              </h1>
              <Bast_Products_Chart />
            </div>
          </section>
        </div>
        {/* Recent Order */}

        <div className=" py-5 mt-7 dark:bg-slate-800 bg-background rounded-md">
          <h1 className="border-s-4 border-red-500 ps-4 font-semibold">
            Recent Order
          </h1>
          <section className="mt-11">
            <Order_Table />
          </section>
        </div>
      </div>
    </>
  );
}
