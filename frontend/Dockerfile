FROM node:latest as build
WORKDIR /app
COPY . . 
RUN npm install -D && npm run build
# RUN npm install -D
# CMD ["npm","run" ,"start"]

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY loadbalancer/nginx.conf /etc/nginx/nginx.conf
# COPY loadbalancer/mime.types /etc/nginx/mime.types
# RUN chmod -R 777 /usr/share/nginx/html
EXPOSE 80

#SIZE: 33.1MB