FROM node:14.13.1-alpine3.10 as build

WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

RUN npm run build

FROM nginx:1.19.3-alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/infra/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]