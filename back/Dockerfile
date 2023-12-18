FROM node:latest

RUN apt-get update && \
    apt-get upgrade -y

COPY ./api /home/api

WORKDIR /home/api

RUN npm i -g npm@10.2.5 && \
    npm i

