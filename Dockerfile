# ✅ 1. Multi-stage build
FROM node:22-alpine AS builder

WORKDIR /app

# ✅ 2. Copy package.json và package-lock.json
COPY package*.json ./

# ✅ 3. Cài đặt dependencies
RUN npm install

# ✅ 4. Copy toàn bộ mã nguồn
COPY . .

# ✅ 5. Build Next.js (Không dùng standalone)
RUN npm run build
RUN npm prune --production

# ✅ 6. Tạo lightweight image cho runtime
FROM node:22-alpine AS runner

WORKDIR /app

# ✅ 7. Copy toàn bộ thư mục `.next` (Vì không có standalone)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# ✅ 8. Chạy Next.js với `npm run start` (Thay vì `server.js`)
CMD ["npm", "run", "start"]
