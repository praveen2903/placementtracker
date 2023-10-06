FROM node:18.0.0-alpine3.15
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]