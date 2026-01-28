FROM node:22-alpine AS deps
WORKDIR /node_fe
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm ci --legacy-peer-deps


FROM node:22-alpine AS builder
WORKDIR /node_fe
COPY . .
COPY --from=deps /node_fe/node_modules ./node_modules

ARG NEXT_PUBLIC_BASE_DOMAIN_BE
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY


ENV NEXT_PUBLIC_BASE_DOMAIN_BE=${NEXT_PUBLIC_BASE_DOMAIN_BE}
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY=${NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY}

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /node_fe
COPY --from=builder /node_fe/.next/standalone ./
COPY --from=builder /node_fe/public ./public
COPY --from=builder /node_fe/.next/static ./.next/static

CMD ["node", "server.js"]

# docker image build --build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID --build-arg NEXT_PUBLIC_BASE_DOMAIN=$NEXT_PUBLIC_BASE_DOMAIN --build-arg NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY=$NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY -t vulebaolong/img-fe_main:latest .