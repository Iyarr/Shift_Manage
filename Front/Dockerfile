FROM node:latest

RUN apt-get update && \
    apt-get upgrade -y

WORKDIR /home

COPY ./api ./api

WORKDIR /home/api

RUN npm i && \
    npm i -g npm@9.6.7 && \
    npm i create-react-app
