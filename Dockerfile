FROM node:20-alpine

# Set working directory
WORKDIR /app

# Salin file package.json dan lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek (termasuk prisma/)
COPY . .

# Generate Prisma client (HARUS setelah file prisma/schema.prisma disalin)
RUN npx prisma generate

# Buka port
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
