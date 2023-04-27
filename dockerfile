FROM node:16.17.0 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 80