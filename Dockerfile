FROM node:20-alpine
# Install OpenSSL karena Prisma membutuhkan saat generate di Alpine
RUN apk add --no-cache openssl

# Atur working directory
WORKDIR /app

# Salin file dependency terlebih dahulu untuk caching layer
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke container (termasuk prisma/schema.prisma dan .env jika dibutuhkan oleh Prisma)
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Buka port untuk aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]