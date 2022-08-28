#!/bin/sh

rm -rf ./build

babel ./src --out-dir build --copy-files

echo 'DOMAIN=localhost:5000\nPORT=3000\nINVEROMENT=local\nNODE_ENV=production' > ./build/.env.local