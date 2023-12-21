# Image de base Node.js
FROM node:alpine

# Création du répertoire de travail
WORKDIR /app/api

# Copie des fichiers du projet
COPY package.json .

# Installation des dépendances
RUN npm install

# Copie des fichiers du projet
COPY . .

# Exposition du port
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["npm", "run", "dev"]
