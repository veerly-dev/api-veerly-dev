FROM node:22-slim

WORKDIR /app
COPY . .

RUN npm install
RUN npx prisma generate
RUN nx build @linkstack-hub/linkstack

CMD ["node", "dist/apps/linkstack/main.js"]