# Build stage
FROM node:20.12.2 AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Production stage
FROM node:20.12.2
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
COPY .env ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod
CMD ["node", "dist/main"]