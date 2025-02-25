# Build Stage

#use latest LTS version of node.js
FROM node:18-alpine AS frontbuild

#set working directory
WORKDIR C:\Users\jasmi\OneDrive\Documents\GitHub\quantum-coders\frontend

#copy package.json and package-lock.json to working directory
COPY package*.json ./

#vite
RUN npm install -g vite

#copy rest of the application files to container
COPY . .

#expose the port the app runs on
EXPOSE 5173

#define commands to run the app
CMD ["npm", "run", "dev"]
