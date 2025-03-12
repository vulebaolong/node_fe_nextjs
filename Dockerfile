FROM node:22-alpine AS deps
WORKDIR /node_fe_nextjs
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /node_fe_nextjs
COPY . .
COPY --from=deps /node_fe_nextjs/node_modules ./node_modules
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /node_fe_nextjs
COPY --from=builder /node_fe_nextjs/.next/standalone ./
COPY --from=builder /node_fe_nextjs/public ./public
COPY --from=builder /node_fe_nextjs/.next/static ./.next/static

CMD ["node", "server.js"]
