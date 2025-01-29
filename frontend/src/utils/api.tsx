import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getStockData = async (
  stockName: any = "",
  selectedYear: any = "2024"
) => {
  const response = await api.get(
    `/api/stock-data?stockName=${stockName}&selectedYear=${selectedYear}`
  );
  return response.data;
};

export const getStockList = async () => {
  const response = await api.get(`/api/stock-list`);
  return response.data;
};

export const getStockDataTable = async () => {
  const response = await api.get(`/api/stock-data-table`);
  return response.data;
};
