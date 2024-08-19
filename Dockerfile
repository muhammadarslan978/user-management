# Use the official Node.js image as the base image
# Switching to node:18-slim to avoid issues with bcrypt on Alpine
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install necessary dependencies for bcrypt
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && npm install -g pnpm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy pnpm lockfile and package.json
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN pnpm build

# Expose the application port
EXPOSE 3000

# Health check to monitor the container status
HEALTHCHECK --interval=30s --timeout=10s \
    CMD curl -f http://localhost:3000/health || exit 1

# Define the command to start the application
CMD ["pnpm", "start:prod"]
