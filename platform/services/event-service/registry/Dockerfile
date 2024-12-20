FROM node:20

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install


# Copy the application source code
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]

