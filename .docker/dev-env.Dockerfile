FROM node:20.12.2
ENV NODE_ENV=development NODE_OPTIONS=--max_old_space_size=2048
WORKDIR /app
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "run", "start:dev"]