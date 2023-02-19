FROM python:alpine3.16
WORKDIR /app
COPY . .
RUN chmod +x /app/wait-for-it.sh
RUN apk --no-cache add musl-dev mariadb-dev gcc bash
RUN pip install -r requirements.txt
EXPOSE 8000

#SIZE: 259MB