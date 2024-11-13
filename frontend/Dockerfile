# Use the official Node.js image
FROM node:14

# Set working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 for the React development server
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
