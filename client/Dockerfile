FROM node:16.15.1-alpine3.15 as build-stage

ARG NODE_ENV="production"

RUN mkdir -p ./client

WORKDIR /client

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN node node_modules/node-sass/scripts/install.js

RUN yarn run build

FROM nginx:1.23.1-alpine

COPY --from=build-stage /client/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
