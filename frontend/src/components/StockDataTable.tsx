"use client";
import React, { useEffect, useState } from "react";
import { getStockDataTable } from "@/utils/api";
import { cn } from "@/lib/utils";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { ClientSideRowModelModule } from "ag-grid-community";

export default function StockDataTable() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockData() {
      try {
        setLoading(true);
        const data: any = await getStockDataTable();
        console.log("Stock Data:", data);

        if (!Array.isArray(data) || data.length === 0) {
          console.error("Invalid stock data received:", data);
          return;
        }

        setRowData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStockData();
  }, []);

  const columnDefs = [
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Open", field: "open", sortable: true, filter: true },
    { headerName: "High", field: "high", sortable: true, filter: true },
    { headerName: "Low", field: "low", sortable: true, filter: true },
    { headerName: "Close", field: "close", sortable: true, filter: true },
    { headerName: "Volume", field: "volume", sortable: true, filter: true },
  ];

  return (
    <div
      className={cn("flex w-full flex-col gap-3 rounded-xl border p-5 shadow")}
    >
      {loading ? (
        <p className="text-sm text-white">Loading data...</p>
      ) : rowData.length > 0 ? (
        <div
          className="ag-theme-material"
          style={{ height: "60vh", width: "100%" }}
        >
          <AgGridReact
            className="ag-theme-material w-full h-full"
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationAutoPageSize={true}
            paginationPageSize={10}
            modules={[ClientSideRowModelModule]}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
