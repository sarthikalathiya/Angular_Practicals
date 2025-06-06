# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build app
RUN npm run build

# Expose app port
EXPOSE 3000

# Start app
# CMD ["node", "dist/main"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
