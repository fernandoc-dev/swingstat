FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Install a static server to serve the build folder
RUN npm install -g serve

# Create a serve.json configuration file
RUN echo '{"rewrites": [{"source": "**", "destination": "/index.html"}]}' > serve.json

# Serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
