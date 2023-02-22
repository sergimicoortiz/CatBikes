Put here your ssl certificates (with this specific names):
- cert.pem
- key.pem

Generation command:

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=ES/ST=Spain/L=Spain/O=CatBikes/CN=www.example.com"