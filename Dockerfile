FROM node:18 AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm run build:prod

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
