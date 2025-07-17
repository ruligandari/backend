FROM node:20

# Set working directory
WORKDIR /app

# Salin file dependency
COPY package*.json ./

# Install dependency
RUN npm install

# Salin semua file project
COPY . .

# Jalankan Prisma generate
RUN npx prisma generate

# Jalankan aplikasi
CMD ["npm", "run", "start"]
