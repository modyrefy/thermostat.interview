#FROM node:14.17-alpine3.12 as build
#WORKDIR "/app"
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#CMD ["npm", "run", "start"]

FROM node:14.17-alpine3.12 as build
RUN apk add \
        make \
        g++ \
        python3
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
#RUN npm install react-scripts@4.0.3 -g
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.19.7-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
