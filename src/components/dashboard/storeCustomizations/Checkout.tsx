"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { checkout_schema } from "@/Types";
import Tag_Hr from "./Tag";
import { useTranslations } from "next-intl";
import axios from "axios";
import { Form } from "@/components/ui/form";
import ButtonLoading from "../buttons/ButtonLoading";

type CheckoutFormValues = z.infer<typeof checkout_schema>;

export default function CheckoutPage({ defaultData }: { defaultData: any }) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkout_schema),
    defaultValues: defaultData,
  });

  const t = useTranslations("storeCustomizations");

  const submit = async (data: CheckoutFormValues) => {
    try {
      await axios.post("/api/store_customiza", {
        CheckoutSchema: data,
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-4">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-blue-400">
        {t("Checkout")}
      </h1>
      <section className="px-4 md:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            {/* Personal Details */}
            <Tag_Hr name="Personal Details" />
            <section className="mb-6 grid-cols-1 sm:grid-cols-3 grid md:grid-cols-5 gap-3">
              <Controller
                name="personalDetails.personalDetails"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Personal Details" />
                )}
              />
              <Controller
                name="personalDetails.firstName"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="First Name" />
                )}
              />
              <Controller
                name="personalDetails.lastName"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Last Name" />
                )}
              />
              <Controller
                name="personalDetails.emailAddress"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} type="email" placeholder="Email Address" />
                )}
              />
              <Controller
                name="personalDetails.phone"
                control={form.control}
                render={({ field }) => <Input {...field} placeholder="Phone" />}
              />
            </section>

            {/* Shipping Details */}
            <Tag_Hr name="Shipping Detail" />
            <section className="mb-6 grid-cols-1 sm:grid-cols-3 grid md:grid-cols-5 gap-3">
              <Controller
                name="shippingDetails.shippingDetails"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Shipping Details" />
                )}
              />
              <Controller
                name="shippingDetails.streetAddress"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Street Address" />
                )}
              />
              <Controller
                name="shippingDetails.city"
                control={form.control}
                render={({ field }) => <Input {...field} placeholder="City" />}
              />
              <Controller
                name="shippingDetails.country"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Country" />
                )}
              />
              <Controller
                name="shippingDetails.zipPostal"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Zip/Postal Code" />
                )}
              />
              <Controller
                name="shippingDetails.shippingCost"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Shipping Cost" />
                )}
              />
              <Controller
                name="shippingDetails.shippingOneName"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Shipping Option 1 Name" />
                )}
              />
              <Controller
                name="shippingDetails.shippingOneDescription"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Shipping Option 1 Description"
                  />
                )}
              />
              <Controller
                name="shippingDetails.shippingOneCost"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Shipping Option 1 Cost"
                  />
                )}
              />
              <Controller
                name="shippingDetails.shippingTwoName"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Shipping Option 2 Name" />
                )}
              />
              <Controller
                name="shippingDetails.shippingTwoDescription"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Shipping Option 2 Description"
                  />
                )}
              />
              <Controller
                name="shippingDetails.shippingTwoCost"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Shipping Option 2 Cost"
                  />
                )}
              />
              <Controller
                name="shippingDetails.paymentMethod"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Payment Method" />
                )}
              />
              <Controller
                name="shippingDetails.continueButton"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Continue Button Label" />
                )}
              />
              <Controller
                name="shippingDetails.confirmButton"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Confirm Button Label" />
                )}
              />
            </section>

            {/* Cart Item Section */}
            <Tag_Hr name="Cart Item Section" />
            <section className="mb-6 grid-cols-1 sm:grid-cols-3 grid md:grid-cols-5 gap-3">
              <Controller
                name="cartItemSection.orderSummary"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Order Summary" />
                )}
              />
              <Controller
                name="cartItemSection.applyButton"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Apply Button Label" />
                )}
              />
              <Controller
                name="cartItemSection.subTotal"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Subtotal" />
                )}
              />
              <Controller
                name="cartItemSection.discount"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Discount" />
                )}
              />
              <Controller
                name="cartItemSection.totalCost"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="Total Cost" />
                )}
              />
            </section>

            <ButtonLoading name="Save Changes" loading={form.formState.isSubmitting}/>
          </form>
        </Form>
      </section>
    </div>
  );
}
