import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getStockData } from "@/utils/api";
import { cn } from "@/lib/utils";

export default function StockChart({
  stockName,
  chartType,
  selectedYear,
}: any) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchStockChartData() {
      try {
        const data = await getStockData(stockName, selectedYear);
        const formattedData = data.map((item: any) => ({
          date: item.date,
          price: item.close,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching stock chart data:", error);
      }
    }

    fetchStockChartData();
  }, [stockName, selectedYear]);

  const renderChart = () => {
    if (!chartData.length) return null;

    const axisStyle = { fontSize: 12, fill: "#FFFFFF" };

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) =>
                  new Date(dateStr).toLocaleString("en-US", { month: "short" })
                }
                tick={axisStyle}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis tick={axisStyle} />
              <Tooltip
                contentStyle={{
                  background: "#222",
                  color: "#FFF",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ color: "#FFF" }} />
              <Bar dataKey="price" fill="lightgreen" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="price"
                nameKey="date"
                fill="green"
                label
              />
              <Tooltip
                contentStyle={{
                  background: "#222",
                  color: "#FFF",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) =>
                  new Date(dateStr).toLocaleString("en-US", { month: "short" })
                }
                tick={axisStyle}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis tick={axisStyle} />
              <Tooltip
                contentStyle={{
                  background: "#222",
                  color: "#FFF",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ color: "#FFF" }} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="lightgreen"
                fill="lightgreen"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid strokeOpacity={0.2} />
              <PolarAngleAxis
                dataKey="date"
                tickFormatter={(dateStr) =>
                  new Date(dateStr).toLocaleString("en-US", { month: "short" })
                }
                tick={axisStyle}
              />
              <PolarRadiusAxis tick={axisStyle} />
              <Radar
                name="price"
                dataKey="price"
                stroke="lightgreen"
                fill="green"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  background: "#222",
                  color: "#FFF",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ color: "#FFF" }} />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) =>
                  new Date(dateStr).toLocaleString("en-US", { month: "short" })
                }
                tick={axisStyle}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis tick={axisStyle} />
              <Tooltip
                contentStyle={{
                  background: "#222",
                  color: "#FFF",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ color: "#FFF" }} />
              <Line type="basis" dataKey="price" stroke="lightgreen" />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-4 shadow bg-black",
        "h-full"
      )}
    >
      {chartData.length ? (
        renderChart()
      ) : (
        <p className="text-sm text-white">Loading chart...</p>
      )}
    </div>
  );
}
