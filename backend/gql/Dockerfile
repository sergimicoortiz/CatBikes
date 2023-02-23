FROM node:gallium-alpine3.16
WORKDIR /app
COPY . .
RUN chmod +x /app/wait-for-it.sh
RUN apk --no-cache add bash
RUN npm install
EXPOSE 4000
EXPOSE 443

#Size: 217MB