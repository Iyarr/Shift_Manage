FROM node:latest

RUN apt-get update && \
    apt-get upgrade -y

WORKDIR /home

COPY ./javascript-starter ./javascript-starter

WORKDIR /home/javascript-starter

RUN npm i && \
    npm i -g npm@9.6.7 && \
    npm i -g @nestjs/cli