# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Transpile TypeScript to JavaScript
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/app.js"]

