# Dockerfile
FROM node:18

# Set working dir
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port (optional, Heroku ignores this)
EXPOSE 3000

# Start the bot
CMD ["node", "index.js"]
