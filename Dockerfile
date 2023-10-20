# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install -f

# Copy the rest of the application files to the working directory
COPY . .

# Set the NODE_ENV environment variable to production
ENV NODE_ENV=production

# Build the TypeScript code using webpack
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3010

# Define the command to run your application
CMD ["npm", "start"]