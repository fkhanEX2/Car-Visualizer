# ---- Build Stage ----
FROM node:18-alpine AS builder

# Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory to /app
WORKDIR /app

# Install global packages
RUN npm install -g npm

# Copy package files and set permissions
COPY --chown=appuser:appgroup package*.json ./
RUN chown -R appuser:appgroup /app
USER appuser
RUN npm install --force

# Switch back to root to copy rest of the application code
USER root
COPY --chown=appuser:appgroup . .
USER appuser

# Build the React app
RUN npm run build

# ---- Run Stage ----
FROM nginx:1.15.2-alpine

# Copy build folder from builder stage
COPY --from=builder --chown=appuser:appgroup /app/build /usr/share/nginx/html/

# Nginx config
# (You would have your Nginx config files ready as per the provided example)
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Make our shell script executable
RUN chmod +x env.sh

# Expose port 80 for the container (or any other port you want your app to run on)
EXPOSE 80

# Start Nginx server and set environment variables
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
