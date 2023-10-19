FROM node:latest

RUN apt update && apt upgrade -y && \
    npm i -g npm@latest

COPY ./app-frontend /home/app-frontend

WORKDIR /home/app-frontend

RUN npm ci