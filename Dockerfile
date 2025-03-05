# Use a lightweight Node.js image for building
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# # Build the Vite app
# RUN npm run dev

# Use a lightweight Nginx image to serve the built app
FROM nginx:alpine

# Copy the built files to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
