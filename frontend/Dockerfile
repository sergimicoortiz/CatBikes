FROM node:latest as build
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY loadbalancer/nginx.conf /etc/nginx/nginx.conf
EXPOSE 443

#SIZE: 32.6MB