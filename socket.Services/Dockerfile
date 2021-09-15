#FROM node:14.17-alpine3.12 as build
#WORKDIR "/app"
#COPY package.json package-lock.json ./
#RUN npm install
#RUN npm install -g typescript
#COPY . .
#RUN tsc
#
#FROM node:14.17-alpine3.12 as run
#
#WORKDIR /app
#
#COPY --from=build /app/package.json /app/package-lock.json /app/
#COPY --from=build /app/dist /app
#
#RUN npm i --production
#
#CMD ["node", "index.js"]


FROM node:14.17-alpine3.12 as build
WORKDIR "/app"
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]