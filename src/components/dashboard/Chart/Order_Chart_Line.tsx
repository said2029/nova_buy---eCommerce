"use client";

import { LineChart, CartesianGrid, XAxis, Line } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", Order: 186, sales: 80 },
  { month: "February", Order: 305, sales: 200 },
  { month: "March", Order: 237, sales: 120 },
  { month: "April", Order: 0, sales: 190 },
  { month: "May", Order: 209, sales: 130 },
  { month: "June", Order: 214, sales: 140 },
];

const chartConfig = {
  Order: {
    label: "Order",
    color: "green",
  },
  sales: {
    label: "sales",
    color: "orange",
  },
} satisfies ChartConfig;

export function Order_Chart() {
  return (
    <ChartContainer  config={chartConfig} className="min-h-[200px] w-full">
      <LineChart  accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis

          dataKey="month"
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="Order"
          color="var(--color-Order)"
          fill="var(--color-Order)"
          radius={4}
        />
        <Line dataKey="sales" fill="var(--color-sales)" radius={4} />
      </LineChart>
    </ChartContainer>
  );
}
