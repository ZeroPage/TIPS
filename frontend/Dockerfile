FROM node:10 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.15.9-alpine

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#Use "sudo docker build -t tips ." -> "sudo docker run -p 8080:80 -d --name TIPS_FRONT tips" 