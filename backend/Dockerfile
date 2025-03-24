# Utilisation de l'image officielle de Node.js
FROM node:16-alpine

# Créer un répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY backend/package*.json ./
RUN npm install

# Copier le reste des fichiers
COPY backend/ .

# Exposer le port de l'application
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "start"]
