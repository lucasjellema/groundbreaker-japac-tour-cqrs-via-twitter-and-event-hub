# note: run docker build in a directory that contains this Docker build file, the package.json file and all your application sources and static files 
# this directory should NOT contain the node-modules or any other resources that should not go into the Docker container - unless these are explicitly excluded in a .Dockerignore file!

# note: this application requires you to have the following environment variables set:
# {name:"KAFKA_SERVER" , message:"with the IP address of the Kafka Server to which the application should publish"},
# {name:"KAFKA_TOPIC" , message:"with the name of the Kafka Topic to which the application should publish"},
# {name:"MONGODB_HOST" , message:"with the value for the host on which the MongoDB instance is running"},
# {name:"MONGODB_PORT" , message:"with the value for the port on the mongoDB host where the database is listening"},
# {name:"MONGODB_DATABASE" , message:"with the value for the name of the MongoDB database"},
#    {name:"TWITTER_CONSUMER_KEY" , message:"with the consumer key for a set of Twitter client credentials"},
#    {name:"TWITTER_CONSUMER_SECRET" , message:"with the consumer secret for a set of Twitter client credentials"},
#    {name:"TWITTER_ACCESS_TOKEN_KEY" , message:"with the access token key for a set of Twitter client credentials"},
#    {name:"TWITTER_ACCESS_TOKEN_SECRET" , message:"with the access token secret for a set of Twitter client credentials"},
# {name:"TWITTER_HASHTAG" , message:"with the value for the twitter hashtag to use when publishing tweets"},

# docker build -t <your username>/cqrs-from-twitter-or-kafka-to-mongodb .
# docker build -t lucasjellema/cqrs-from-twitter-or-kafka-to-mongodb .

# to run the container, exposing port 8080 in the container at 8090 in the host :
# docker run -p 8095:8095  -e KAFKA_SERVER=127.1.1.1 -e KAFKA_TOPIC=topic -e TWITTER_CONSUMER_KEY=818 -e TWITTER_CONSUMER_SECRET=secret -e TWITTER_ACCESS_TOKEN_KEY=tokenkey -e TWITTER_ACCESS_TOKEN_SECRET=secret  lucasjellema/cqrs-from-twitter-or-kafka-to-mongodb -e PORT=8095

# then tag the container:
# docker tag lucasjellema/cqrs-from-twitter-or-kafka-to-mongodb:latest lucasjellema/cqrs-from-twitter-or-kafka-to-mongodb:0.9

# and push it to Docker Hub (after logging in to Docker Hub: docker login)
# docker push lucasjellema/cqrs-from-twitter-or-kafka-to-mongodb:0.9


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
ENV PORT=8085

#so we should expose that port
EXPOSE 8085
# run the application, using npm start (which runs the start script in package.json)

CMD [ "npm", "start" ]


