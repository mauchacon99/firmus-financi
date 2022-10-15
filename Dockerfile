FROM node:16.13.1

RUN mkdir -p   /usr/src/fronted

WORKDIR /usr/src/fronted

COPY . /usr/src/fronted/

RUN yarn install

COPY package.json /usr/src/fronted/

ENV NODE_ENV="production"

EXPOSE 3000

RUN yarn build

CMD [ "npm", "start" ]
