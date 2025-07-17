# Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma client (ini penting!)
RUN npx prisma generate

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
