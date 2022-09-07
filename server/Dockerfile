FROM node:16.15.1-alpine3.15

ARG NODE_ENV="production"

RUN mkdir /server

WORKDIR /server

COPY package.json ./

COPY yarn.lock ./

RUN yarn global add sequelize-cli

RUN yarn global add @babel/core @babel/cli

RUN yarn install

RUN rm -f sequelize-data.json sequelize-meta.json

COPY . .

RUN yarn run build

CMD ./start.sh
