# Use official Python image as a parent image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 (default for FastAPI)
EXPOSE 8000

# Command to run the FastAPI app
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
