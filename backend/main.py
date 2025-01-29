from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
from datetime import datetime

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend is running yaay"}


stock_list = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "TSLA",
    "META",
    "NVDA",
    "MS",
    "UNH",
    "V",
]


@app.get("/api/stock-list")
async def get_stock_list():
    try:
        return stock_list
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"Error fetching data: {e}")


@app.get("/api/stock-data")
async def get_stock_data(stockName: str = "AAPL", selectedYear: str = "2023"):
    """
    Get monthly stock data for the selected year.
    """
    try:
        start_date = f"{selectedYear}-01-01"
        end_date = f"{selectedYear}-12-31"

        stock = yf.Ticker(stockName)
        hist = stock.history(interval="1mo", start=start_date, end=end_date)

        response = [
            {
                "date": str(row.name.date()),
                "open": row["Open"],
                "high": row["High"],
                "low": row["Low"],
                "close": row["Close"],
                "volume": row["Volume"],
            }
            for _, row in hist.iterrows()
        ]
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {e}")


@app.get("/api/stock-data-table")
async def get_stock_data_table():
    """
    Get monthly stock data for the selected year.
    """
    try:

        response = []
        for tick in stock_list:
            stock = yf.Ticker(tick)
            hist = stock.history()

            response.extend(
                [
                    {
                        "date": str(row.name.date()),
                        "open": row["Open"],
                        "high": row["High"],
                        "low": row["Low"],
                        "close": row["Close"],
                        "volume": row["Volume"],
                    }
                    for _, row in hist.iterrows()
                ]
            )
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {e}")
