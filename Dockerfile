FROM node:18-alpine
WORKDIR /selfiematon
COPY . .
RUN npm install
CMD npm run dev -- --host