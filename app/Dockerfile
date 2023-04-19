FROM node:17.9.0

WORKDIR /app

RUN yarn install
RUN npx prisma migrate dev
RUN npx prisma db seed
