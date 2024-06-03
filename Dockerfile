# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.14.0

# Use Node 16 alpine as parent image
FROM node:${NODE_VERSION}-alpine

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE 3005

# Start the application
CMD npm run dev
