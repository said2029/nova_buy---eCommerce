"use client";

import {
  ChartData,
  ArcElement,
  Chart,
  RadialLinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";

export default function Bast_Products_Chart({labels,Data}:{labels:[],Data:[]}) {
  const [chartData, SetchartData] = useState<ChartData<
    "polarArea",
    number[],
    unknown
  > | null>(null);
  useEffect(() => {
    Chart.register(
      ArcElement,
      RadialLinearScale,
      Title,
      Tooltip,
      Legend,

    );
    SetchartData({
      labels: labels,
      datasets: [
        {
          label: "Best Selling",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 2)",
          ],
          data: Data,
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,1)",
          hoverBorderColor: "rgba(255,99,132,1)",
          hoverBorderWidth: 2,
        },
      ],
    });
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="card flex h-96 justify-content-center">
        {chartData && <PolarArea tabIndex={1} data={chartData} />}
      </section>
    </div>
  );
}
