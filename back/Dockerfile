FROM node:latest

RUN apt update && apt upgrade -y && \
    npm i -g npm@latest

COPY ./api /home/api

WORKDIR /home/api

RUN npm i && \
    npm start

