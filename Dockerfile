from node:14-alpine

WORKDIR /app

COPY ["package.json","nuxt.config.ts","tsconfig.json", "/app/"]

# Install app dependencies

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install && cnpm install -g ts-node

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production
ENV NODE_Docker=docker

COPY .nuxt /app/.nuxt
COPY assets /app/assets
COPY dist /app/dist
COPY middleware /app/middleware
COPY plugins /app/plugins
COPY server /app/server
COPY store /app/store
COPY types /app/types

CMD ["ts-node","--project", "./server/serverTsconfig.json","./server/index.ts"]
