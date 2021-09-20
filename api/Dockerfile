FROM node:14-alpine
WORKDIR /usr/src/app
RUN apk add --update alpine-sdk && apk add linux-headers
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python3

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production
CMD ["node", "."]
USER node