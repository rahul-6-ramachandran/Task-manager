#  Node.js image
FROM node:20-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the application port 
EXPOSE 7070

# Run database migrations before starting the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
