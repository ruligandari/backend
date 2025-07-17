FROM node:20-alpine

# Set working directory
WORKDIR /app

# Salin dependency file saja
COPY package*.json ./

# Install dependencies menggunakan npm ci untuk clean install
RUN npm ci --omit=dev

# Salin semua source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
