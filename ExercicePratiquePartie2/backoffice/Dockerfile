# Image de base Node.js
FROM node:alpine AS build

# Copie des fichiers du projet
WORKDIR /app/backoffice
COPY package.json .
RUN npm install
COPY . .

# Build de l'application Vue.js
RUN npm run build

# Serveur HTTP léger pour l'application Vue.js
FROM nginx:alpine
COPY --from=build /app/backoffice/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
