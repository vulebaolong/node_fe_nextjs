# ---------- builder ----------
FROM node:24-alpine AS builder
WORKDIR /fe
ENV NEXT_TELEMETRY_DISABLED=1

# pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# cài deps đầy đủ để build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# copy source
COPY . .

# (nếu bạn cần biến NEXT_PUBLIC_* lúc build, truyền bằng --build-arg)
# stage build
ARG NEXT_PUBLIC_BASE_DOMAIN_BE
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY

ENV NEXT_PUBLIC_BASE_DOMAIN_BE=${NEXT_PUBLIC_BASE_DOMAIN_BE}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY=${NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY}

RUN printenv | grep NEXT_PUBLIC_ 

# yêu cầu next.config.js có: module.exports = { output: 'standalone' }
# Build NestJS
RUN pnpm run build

# Cài dependencies production-only
RUN pnpm prune --prod

# ---------- runner ----------
FROM node:24-alpine AS runner
WORKDIR /fe
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1


# chỉ cài prod deps để runtime sạch
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy app đã build
COPY --from=builder /fe/.next/standalone ./
COPY --from=builder /fe/public ./public
COPY --from=builder /fe/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
