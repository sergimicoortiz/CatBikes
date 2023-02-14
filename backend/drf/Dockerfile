FROM python:3.10.10-alpine3.17
WORKDIR /app
COPY . .
RUN chmod +x /app/wait-for-it.sh
RUN apk --no-cache add musl-dev mariadb-connector-c-dev mariadb-dev gcc bash
RUN pip install -r requirements.txt
EXPOSE 8000

#SIZE: 300MB