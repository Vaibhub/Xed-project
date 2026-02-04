# Step 1: Build the app
FROM node:24-alpine AS builder

WORKDIR /app

COPY app/package*.json ./
RUN npm install

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_URL_LOCAL
ARG API_KEY

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_URL_LOCAL=${NEXT_PUBLIC_API_URL_LOCAL}
ENV API_KEY=${API_KEY}

COPY app .
RUN npm run build

# Step 2: Production image
FROM node:24-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]