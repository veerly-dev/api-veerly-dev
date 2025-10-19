# -------- Stage 1: Build --------
FROM node:22-slim AS builder

ENV NX_DAEMON=false
WORKDIR /app

# System dependencies
RUN apt-get update -y && apt-get install -y openssl

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace metadata
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./

# Copy app and libs
COPY api ./api
COPY libs ./libs

# Install dependencies
RUN pnpm install

# Build all libs first
RUN npx nx build auth --verbose
RUN npx nx build blog --verbose
RUN npx nx build drizzle-client --verbose
RUN npx nx build profile --verbose

# Build main API app
RUN npx nx build api --verbose

# -------- Stage 2: Production --------
FROM node:22-slim AS runner

WORKDIR /app

# Copy built code and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/api/main.js"]