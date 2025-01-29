"use client";
import PageTitle from "@/components/PageTitle";
import StockChart from "@/components/StockChart";
import { useState } from "react";
import StockDataTable from "@/components/StockDataTable";

export default function Home() {
  const chartTypes = ["line", "bar", "pie", "radar", "area"];
  const stockOptions = ["AAPL", "GOOGL", "MSFT", "TSLA"];

  const [selectedStocks, setSelectedStocks] = useState(
    chartTypes.reduce((acc, type) => ({ ...acc, [type]: "AAPL" }), {})
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleStockChange = (chartType: string, stock: string) => {
    setSelectedStocks((prev) => ({ ...prev, [chartType]: stock }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col w-full items-center p-6">
      <PageTitle title="Stock Table" />
      <section className=" w-full mt-2">
        <StockDataTable />
      </section>
    </div>
  );
}
