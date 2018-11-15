# note: run docker build in a directory that contains this Docker build file, the package.json file and all your application sources and static files 
# this directory should NOT contain the node-modules or any other resources that should not go into the Docker container - unless these are explicitly excluded in a .Dockerignore file!

FROM node:10.13.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source - copy Node application from the current directory
COPY . .

# the application will be exposed at port 8080 
ENV PORT=8080

#so we should expose that port
EXPOSE 8080
# run the application, using npm start (which runs the start script in package.json)

CMD [ "npm", "start" ]
