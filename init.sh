#/bin/bash

if [ -f .env ]; then
    echo '.env exists.'
else
    echo '.env does not exist. copy from example'
    cp .env.example .env
fi