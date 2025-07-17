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
ENV CLIENT_URL=http://localhost:3000
ENV DATABASE_URL="postgresql://postgres.kyiuvqvwhaxzqyyaxkpa:unigames20252@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
ENV MP_ACCESS_TOKEN=TEST-7053202351013149-070523-8dbc99a8529ee70cd4e6ce24a7e00ddf-278389952
ENV MP_WEBHOOK_SECRET=beee34a548c83d8932e1eadb74f90afde9e8182a3666d8b10b28eb5f44628c0c

CMD ["node", "dist/server.js"]
