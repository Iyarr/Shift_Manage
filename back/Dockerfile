FROM node:latest

RUN apt-get update && \
    apt-get upgrade -y

COPY ./api /home/api

WORKDIR /home/api

RUN npm i -g npm@9.6.7 && \
    npm i && \
    npm i -g @nestjs/cli

