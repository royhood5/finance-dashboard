from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

router = APIRouter(prefix="/finance", tags=["finance"])


@router.get("/api/stock-data")
async def get_stock_data(ticker: str):
    """
    Get stock data for a specific ticker symbol.
    """
    try:
        # Fetch data from Yahoo Finance
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1mo")  # Get last 1 month's data

        # Format the response
        response = {
            "ticker": ticker.upper(),
            "data": [
                {
                    "date": str(row.name.date()),
                    "open": row["Open"],
                    "high": row["High"],
                    "low": row["Low"],
                    "close": row["Close"],
                    "volume": row["Volume"],
                }
                for _, row in hist.iterrows()
            ],
        }
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {e}")
