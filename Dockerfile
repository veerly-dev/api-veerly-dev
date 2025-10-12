FROM node:22-slim

WORKDIR /app
COPY . .
# Install system dependencies
RUN apt-get update -y && apt-get install -y openssl
# Install Node dependencies
RUN npm install --legacy-peer-deps
# Generate Prisma Client
RUN npx prisma generate --schema=apps/linkstack/prisma/schema.prisma

# Build lib prisma
RUN npx nx build @veerly-dev/prisma

# Build your auth-google
RUN npx nx build @veerly-dev/auth-google

# Build your organization
RUN npx nx build @veerly-dev/organization

# Build your NestJS app
RUN npx nx build @veerly-dev/linkstack

CMD ["node", "apps/linkstack/dist/main.js"]