FROM node:20-alpine

WORKDIR /app

# Salin semua file proyek SEKALIGUS
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma client setelah file prisma/ tersedia
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "index.js"]
