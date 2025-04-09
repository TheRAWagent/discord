FROM node:22-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y \
    openssl \
    libssl1.1 \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies first for better caching
COPY . .
# COPY package.json package-lock.json ./
RUN npm install

# Copy source code

# Build the application
RUN npx prisma generate
RUN npm run build

# Expose port 3000
EXPOSE 3000
EXPOSE 4000

# Start the application
CMD ["npm", "start"]