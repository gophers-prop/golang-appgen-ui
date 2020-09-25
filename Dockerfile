FROM node:latest as my-app-build
WORKDIR /app
COPY . .
RUN npm install
RUN  npm run build

# stage 2
FROM nginx:alpine
COPY --from=my-app-build /app/dist/go-initializr /usr/share/nginx/html
EXPOSE 80
