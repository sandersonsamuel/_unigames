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

#envs

ENV NODE_ENV=production
ENV PORT=3333
ENV CLIENT_URL=https://unigames-web.vercel.app
ENV DATABASE_URL="postgresql://postgres.kyiuvqvwhaxzqyyaxkpa:unigames20252@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
ENV MP_ACCESS_TOKEN=APP_USR-2506908303186258-102322-6f7db90702ff98beab5eb4330ba00b56-2942601564
ENV MP_WEBHOOK_SECRET=f649d671ba557beb34be6aaf96d414a37aeb641ca0b7b4c1d6a3183a961daa3e

CMD ["node", "dist/server.js"]
