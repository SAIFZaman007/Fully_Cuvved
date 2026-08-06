# ── Build stage ─────────────────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency definitions first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build-time environment variables
ARG VITE_API_URL=/api/v1
ARG VITE_ENABLE_MOCKS=false
ENV VITE_API_URL=$VITE_API_URL \
    VITE_ENABLE_MOCKS=$VITE_ENABLE_MOCKS

# Ensure binaries inside node_modules/.bin have execute permissions
RUN chmod -R +x node_modules/.bin && npm run build

# ── Serve stage ─────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS serve

# Copy Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Probe 127.0.0.1 directly to avoid IPv6 localhost resolution failures
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]