FROM node:12-alpine AS builder

WORKDIR /app

COPY /app/package*.json ./

RUN npm install

COPY /app .

RUN npm run build


FROM node:12-alpine AS server

WORKDIR /app

COPY /app/package* ./

RUN npm install --production

COPY --from=builder ./app/public ./public

COPY --from=builder ./app/build ./build

EXPOSE 8000

CMD ["node", "start"]