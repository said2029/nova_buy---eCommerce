"use client";

import {
  CartesianGrid,
  PieChart,
  Pie,
  Tooltip,
  PieProps,
  Cell,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "January", Order: 186, color: "red" },
    { month: "February", Order: 305, color: "blue" },
    { month: "March", Order: 237, color: "green" },
    { month: "April", Order: 0, color: "yellow" },
    { month: "May", Order: 209, color: "orange" },
    { month: "June", Order: 214, color: "purple" },
  ];
const chartConfig = {
  said: {
    label: "Order",
    color: "green",
  },
} satisfies ChartConfig;

export function Bast_Products_Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <PieChart>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Pie
          label
          nameKey={"month"}
          data={chartData}
          dataKey="Order"
          radius={4}
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ChartContainer>
  );
}
