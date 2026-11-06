FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
USER node
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=15s\
    CMD wget -qO- http://127.0.0.1:${PORT:-5000}/health || exit 1

CMD ["node", "server.js"]