FROM node:16-alpine as builder
WORKDIR /frontend
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build

FROM nginx:1.21-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]