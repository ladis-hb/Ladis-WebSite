
FROM node:14-alpine

WORKDIR /app

COPY ["package.json","tsconfig.json", "/app/"]

# Install app dependencies

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install && cnpm install -g ts-node typescript

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production
ENV NODE_Docker=docker

COPY server /app/server
COPY types /app/types

# 声明容器使用的端口
EXPOSE 9006

VOLUME [ "/data" ]

CMD ["ts-node", "./server/index.ts"]
