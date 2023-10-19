# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Create a working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -f

# Copy the rest of the application files
COPY . .

# Build TypeScript files
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# ---- Production Stage ----
FROM node:18-alpine

# Create a new working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules

# Set environment variables if necessary
# ENV NODE_ENV=production

# Expose the port your app will run on
EXPOSE 3010

# Command to run your application
CMD ["node", "bundle.js"]