FROM node:latest as my-app-build
WORKDIR /app
COPY . .
RUN npm install
RUN  npm run build

# stage 2
FROM nginx:stable-alpine
COPY --from=my-app-build /app/dist/go-initializr /usr/share/nginx/html
COPY --from=my-app-build /app/*.config /etc/nginx/conf.d/
EXPOSE 80
CMD ["sh", "-c", "cp /etc/nginx/conf.d/default-${PROFILE}.conf.template /etc/nginx/conf.d/default.conf; nginx -g 'daemon off;'"]
