FROM node:12 as base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

FROM base as builder
COPY . ./
RUN npm run build

FROM nginx:alpine as nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker-conf/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
