# -------- Stage 1: Build --------
FROM node:22-slim AS builder

# ===== BUILD ARGS =====
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CALLBACK_URL
ARG JWT_SECRET
ARG PORT
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

# ===== ENV FOR BUILD =====
ENV DATABASE_URL=$DATABASE_URL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK_URL
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET

ENV NX_DAEMON=false

WORKDIR /app

# System deps
RUN apt-get update -y && apt-get install -y openssl

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy monorepo metadata
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./

# Copy apps & libs
COPY api ./api
COPY libs ./libs

# Install
RUN pnpm install

# Build libs
RUN npx nx build auth --verbose
RUN npx nx build cloudinary --verbose
RUN npx nx build drizzle-client --verbose
RUN npx nx build profile --verbose

# Build main API
RUN npx nx build api --verbose


# -------- Stage 2: Run --------
FROM node:22-slim AS runner

# ===== RUNTIME ARGS =====
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CALLBACK_URL
ARG JWT_SECRET
ARG PORT
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

# ===== RUNTIME ENV =====
ENV DATABASE_URL=$DATABASE_URL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK_URL
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/api/main.js"]