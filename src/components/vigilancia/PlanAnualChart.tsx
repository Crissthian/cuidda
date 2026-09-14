import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { planData } from "@/lib/vigilanciaData";

export default function PlanAnualChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(580);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 50) {
          setChartWidth(width - 12);
        }
      }
    };

    updateDimensions();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 50) {
            setChartWidth(Math.floor(entry.contentRect.width - 12));
          }
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    const onBeforePrint = () => {
      updateDimensions();
    };

    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("resize", updateDimensions);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <section
      className="col-span-7 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default overflow-visible"
      aria-labelledby="plan-title"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 id="plan-title" className="text-sm uppercase text-text-primary">
            Cumplimiento del plan anual
          </h2>
          <p className="text-xs text-muted">
            Planificado vs. ejecutado (acumulado mensual)
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-violet"></span>
            <span className="font-semibold text-text-secondary">PLAN</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-[#2dd4bf]"></span>
            <span className="font-semibold text-text-secondary">EJECUTADO</span>
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-4 h-56 w-full ps-2 overflow-visible flex items-center justify-center"
      >
        <BarChart
          width={chartWidth}
          height={224}
          data={[...planData]}
          barGap={0}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e7e9ef"
          />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 10, fill: "#8993af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tick={{ fontSize: 10, fill: "#8993af" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f8", opacity: 0.5 }}
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              border: "1px solid #a2c0d4",
            }}
          />
          <Bar
            dataKey="plan"
            fill="#6665DD"
            radius={[4, 4, 0, 0]}
            barSize={25}
            isAnimationActive={false}
            label={{
              position: "top",
              fontSize: 9,
              fill: "#0064D2",
            }}
          />
          <Bar
            dataKey="ejecutado"
            fill="#2dd4bf"
            radius={[4, 4, 0, 0]}
            barSize={25}
            isAnimationActive={false}
            label={{
              position: "top",
              fontSize: 9,
              fill: "#0064D2",
            }}
          />
        </BarChart>
      </div>
    </section>
  );
}
