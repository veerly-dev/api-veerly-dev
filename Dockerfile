FROM node:22-slim

WORKDIR /app
COPY . .
# Install system dependencies
RUN apt-get update -y && apt-get install -y openssl
# Install Node dependencies
RUN npm install --legacy-peer-deps
# Generate Prisma Client
RUN npx prisma generate --schema=apps/linkstack/prisma/schema.prisma
# Build your NestJS app
RUN npx nx build @veerly-dev/linkstack

CMD ["node", "apps/linkstack/dist/main.js"]