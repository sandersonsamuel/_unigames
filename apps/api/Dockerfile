# BUILDER
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm build


# RUNNER FINAL
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3333

CMD ["node", "dist/server.js"]
