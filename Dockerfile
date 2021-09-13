FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build 

FROM nginx
EXPOSE 80
COPY --from=builder /app/dist/utopia /usr/share/nginx/html

#  docker run -p 3000:80 iainlr/user-portal-test