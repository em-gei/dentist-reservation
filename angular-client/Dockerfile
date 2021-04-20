# Create image based on Node 12.18-alpine image from dockerhub
FROM node:12.18-alpine

# Create a directory where app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Copy all the code to run the app
COPY . /app/

# Expose the port where app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]