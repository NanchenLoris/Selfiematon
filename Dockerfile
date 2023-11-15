FROM node:18-alpine
WORKDIR /selfiematon
COPY . .
RUN npm install
CMD ["./pocketbase", "serve"; "npm", "run", "dev"]
EXPOSE 5000