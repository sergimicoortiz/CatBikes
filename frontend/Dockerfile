FROM node:latest as build
WORKDIR /app
COPY . . 
RUN npm install -D && npm run build
WORKDIR /certs
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=ES/ST=Spain/L=Spain/O=CatBikes/CN=www.example.com"

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY loadbalancer/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /certs/cert.pem /etc/nginx/cert.pem
COPY --from=build /certs/key.pem /etc/nginx/key.pem
EXPOSE 443

#SIZE: 32.6MB