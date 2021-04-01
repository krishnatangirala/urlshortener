# Supported Node version
FROM node:14

# Working Directory for the application
WORKDIR /usr/src/app

# Install dependencies using package file
COPY package*.json ./

# Run package manager
RUN npm config set strict-ssl=false
RUN npm config set registry https://registry.npmjs.org/
RUN npm install

# Copy app source
COPY . .

# Open Port 8080 for my app
EXPOSE 8080

# Command to start server
CMD [ "node", "js/service/index.js" ]
