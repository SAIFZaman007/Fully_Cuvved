# ── Build stage ─────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# Build-time API URL can be overridden: docker build --build-arg VITE_API_URL=...
ARG VITE_API_URL=/api/v1
ARG VITE_ENABLE_MOCKS=false
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ENABLE_MOCKS=$VITE_ENABLE_MOCKS
RUN npm run build

# ── Serve stage ─────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
