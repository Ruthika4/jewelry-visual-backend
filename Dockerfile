# Use Node.js as base
FROM node:18

# Install Python and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy Node.js package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend files
COPY . .

# Install Python dependencies
RUN pip3 install -r utils/requirements.txt

# Expose the port your server runs on
EXPOSE 5000

# Start the Node server
CMD ["node", "server.js"]
