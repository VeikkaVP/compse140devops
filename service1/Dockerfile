# Service1 Dockerfile

FROM node:18-alpine
WORKDIR /service1

# Copying package.json and installing libraries
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 8199

CMD ["node", "veikkanode.js"]
