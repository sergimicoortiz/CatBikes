FROM python:3.10.10-alpine3.17
WORKDIR /app
COPY . .
COPY example.env .env
RUN pip install pipenv && pipenv install
EXPOSE 8000