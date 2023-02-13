FROM python:3.10.10-alpine3.17
WORKDIR /app
COPY . .
COPY example.env .env
RUN apk --no-cache add musl-dev mariadb-connector-c-dev mariadb-dev gcc
RUN pip install -r requirements.txt
EXPOSE 8000

#SIZE: 299MB