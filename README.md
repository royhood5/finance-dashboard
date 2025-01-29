Finance Dashboard

This project is a Finance Dashboard built using Next.js (React) for the frontend and FastAPI for the backend. It leverages the Yahoo Finance API to fetch stock data and uses AG Grid for data visualization. Docker is used to containerize both the frontend and backend services.

🚀 Tech Stack

Frontend (Next.js)

React (Next.js 14)

shadcn/ui for modern UI components

AG Grid for stock data visualization

chart.js for displaying stock charts

cn (clsx) utility for conditional styling

Backend (FastAPI)

FastAPI for handling API requests

Yahoo Finance API (via yfinance Python package) for fetching stock market data

Containerization

Docker for containerizing both frontend and backend

Docker Compose for managing multi-container deployment

📦 Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-repo/finance-dashboard.git
cd finance-dashboard

2️⃣ Start with Docker

Ensure Docker and Docker Compose are installed, then run:

docker-compose up --build

This will start both the frontend (port 3000) and backend (port 8000).

📡 API Endpoints (FastAPI)

Method

Endpoint

Description

GET

/api/stock-data?ticker=AAPL

Fetches stock data for the given ticker


GET 

/api/stock-list

Fetches stock list name


GET

/api/stock-data-table

Fetches stock data for the given ticker for datatable



🎨 Frontend Features

✅ Real-time stock charts (Line, Bar, Pie)


