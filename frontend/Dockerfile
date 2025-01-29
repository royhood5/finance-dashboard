# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install -f --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000
