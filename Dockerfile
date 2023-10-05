FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["./pocketbase", "serve"; "npm", "run", "dev"]