FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# Install all dependencies (including build devTools)
RUN npm install
COPY . .
# Build Vite React frontend
RUN npm run build
# Prune dependencies to keep image size small
RUN npm prune --production
EXPOSE 8080
CMD ["node", "server.js"]
