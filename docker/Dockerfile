FROM node:alpine3.10

RUN mkdir /usr/src
RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN mkdir application
RUN mkdir components
RUN mkdir components/restaurants
RUN mkdir controller
RUN mkdir model
RUN mkdir utils

COPY .env .
COPY dist/server.js* ./
COPY dist/application/app.js* application/
COPY dist/components/restaurants/*.js components/restaurants/
COPY dist/controller/*.js* controller/
COPY dist/model/*.js* model/
COPY dist/utils/*.js* utils/

RUN npm install

EXPOSE 9000

ENV TZ America/Bogota
RUN addgroup --system --gid 10101 appuser \
    && adduser --system --disabled-password --uid 10101 --shell /sbin/nologin --home /usr/src/app --ingroup appuser appuser \
    && chown -R appuser:root /usr/src/app \
    && chmod -R 0775 /usr/src/app

CMD ["node", "server.js"]
