FROM node:22-slim

WORKDIR /app
COPY . .

RUN npm install
RUN npx prisma generate --schema=apps/linkstack/prisma/schema.prisma
RUN npx nx build @veerly-dev/linkstack

CMD ["node", "apps/linkstack/dist/main.js"]