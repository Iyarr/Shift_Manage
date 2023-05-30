FROM node:latest

RUN apt-get update && \
    apt-get upgrade -y

COPY ./app-frontend /home/app-frontend

WORKDIR /home/app-frontend

RUN npm i -g npm@9.6.7 && \
    npm i 
