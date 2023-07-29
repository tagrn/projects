FROM node:lts-alpine as build-stage
WORKDIR /homepage
COPY package*.json ./

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf
COPY --from=build-stage ./homepage/dist /usr/share/nginx/html/homepage
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]