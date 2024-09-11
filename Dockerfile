FROM node:18.19.1-alpine3.19 AS build
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM node:18.19.1-alpine3.19
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
