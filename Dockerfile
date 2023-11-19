FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY scripts ./scripts/
COPY prisma ./prisma/

COPY . .
COPY .env.docker ./.env

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python \
    && npm install \
    && npm uninstall bcrypt \
    && npm install bcrypt \
    && apk del build-base gcc

EXPOSE 8000