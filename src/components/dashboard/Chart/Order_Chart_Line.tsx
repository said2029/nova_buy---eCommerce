"use client";

import {
  ChartData,
  ArcElement,
  Chart,
  RadialLinearScale,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function Order_Chart() {
  const [chartData, SetchartData] = useState<ChartData<
    "line",
    number[],
    unknown
  > | null>(null);
  useEffect(() => {
    Chart.register(
      ArcElement,
      RadialLinearScale,
      CategoryScale,
      Title,
      Tooltip,
      LinearScale,
      PointElement,
      LineElement
    );
    SetchartData({
      labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
      datasets: [
        {
          label: "Selling",
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          data: [12, 590, 80, 81, 56],
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
          hoverBorderWidth: 2,
          fill: "rgba(255, 99, 132, 0.2)",
          pointBorderColor: "rgba(255, 99, 132, 0.2)",
          borderCapStyle:"square"
        },
        {
          label: "orders",
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          data: [24, 32, 43, 12, 74],
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
          hoverBorderWidth: 2,
          fill: "rgba(54, 162, 235, 0.2)",
          pointBorderColor: "rgba(54, 162, 235, 0.2)",
          pointHoverBorderWidth:3,
          
        },
      ],
    });
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {chartData && <Line radioGroup="red" data={chartData} />}
    </div>
  );
}
