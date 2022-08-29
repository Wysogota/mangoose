#!/bin/sh

rm -rf ./functions

babel ./src --out-dir functions --copy-files

cp package.json yarn.lock .gitignore .env ./functions

echo '\nDOMAIN=https://us-central1-mangoose-9999.cloudfunctions.net/app\nCLIENT_DOMAIN=https://mangoose-9999.web.app\nINVEROMENT=firebase\nNODE_ENV=production' >> ./functions/.env

yarn install --cwd ./functions

mv ./functions/server.js ./functions/index.js
