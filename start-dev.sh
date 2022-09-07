#!/usr/bin/env bash

systemctl stop mongod
systemctl stop postgresql

docker compose --file docker-compose-dev.yaml up --build
