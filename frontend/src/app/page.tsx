"use client";
import PageTitle from "@/components/PageTitle";
import StockChart from "@/components/StockChart";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getStockData, getStockList } from "@/utils/api";

export default function Home() {
  const chartTypes = ["line", "bar", "radar", "area"];
  const [stockOptions, setStockOptions] = useState<string[]>([]);

  const currentYear = new Date().getFullYear() - 1;
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const [selectedStocks, setSelectedStocks] = useState<{
    [key: string]: string;
  }>(chartTypes.reduce((acc, type) => ({ ...acc, [type]: "AAPL" }), {}));

  const [selectedYears, setSelectedYears] = useState<{ [key: string]: number }>(
    chartTypes.reduce((acc, type) => ({ ...acc, [type]: currentYear }), {})
  );

  const handleStockChange = (chartType: string, stock: string) => {
    setSelectedStocks((prev) => ({ ...prev, [chartType]: stock }));
  };

  const handleYearChange = (chartType: string, year: string) => {
    setSelectedYears((prev) => ({ ...prev, [chartType]: parseInt(year) }));
  };

  useEffect(() => {
    async function fetchStockChartData() {
      try {
        const data = await getStockList();
        console.log(data);
        setStockOptions(data);
      } catch (error) {
        console.error("Error fetching stock chart data:", error);
      }
    }
    fetchStockChartData();
  }, []);

  return (
    <div className="flex flex-col w-full items-center p-1">
      <PageTitle title="Dashboard" />

      <section className="grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-2 w-full mt-6 sm:mt-3">
        {chartTypes.map((chartType) => (
          <div
            key={chartType}
            className="text-white p-4 shadow-lg rounded-xl border flex flex-col items-center"
          >
            <div className="flex justify-center  gap-3 mb-4">
              <Select
                onValueChange={(stock) => handleStockChange(chartType, stock)}
                value={selectedStocks[chartType]}
              >
                <SelectTrigger className="w-72 border rounded-md p-2">
                  <SelectValue placeholder="Select Stock" />
                </SelectTrigger>
                <SelectContent>
                  {stockOptions.map((stock) => (
                    <SelectItem key={stock} value={stock}>
                      {stock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(year) => handleYearChange(chartType, year)}
                value={selectedYears[chartType].toString()}
              >
                <SelectTrigger className="w-72 border rounded-md p-2">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full h-[300px] flex items-center justify-center text-white">
              <StockChart
                stockName={selectedStocks[chartType]}
                chartType={chartType}
                selectedYear={selectedYears[chartType]}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
