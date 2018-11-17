var tweet = require("./tweet");
var eventListener = require("./EventListener");
var ordersAPI = require('./orders-api');
var express = require('express') //npm install express
    , bodyParser = require('body-parser') // npm install body-parser
    , http = require('http')
    ;

var PORT = process.env.PORT || 3000;

const REQUIRED_ENVIRONMENT_SETTINGS = [
    {name:"KAFKA_SERVER" , message:"with the IP address of the Kafka Server to which the application should publish"},
    {name:"KAFKA_TOPIC" , message:"with the name of the Kafka Topic to which the application should publish"},
    {name:"MONGODB_HOST" , message:"with the value for the host on which the MongoDB instance is running"},
    {name:"MONGODB_PORT" , message:"with the value for the port on the mongoDB host where the database is listening"},
    {name:"MONGODB_DATABASE" , message:"with the value for the name of the MongoDB database"},
    {name:"TWITTER_CONSUMER_KEY" , message:"with the consumer key for a set of Twitter client credentials"},
    {name:"TWITTER_CONSUMER_SECRET" , message:"with the consumer secret for a set of Twitter client credentials"},
    {name:"TWITTER_ACCESS_TOKEN_KEY" , message:"with the access token key for a set of Twitter client credentials"},
    {name:"TWITTER_ACCESS_TOKEN_SECRET" , message:"with the access token secret for a set of Twitter client credentials"},
    {name:"TWITTER_HASHTAG" , message:"with the value for the twitter hashtag to use when publishing tweets"},
    ]

for(var env of REQUIRED_ENVIRONMENT_SETTINGS) {
  if (!process.env[env.name]) {
    console.error(`Environment variable ${env.name} should be set: ${env.message}`);  
  } else {
    // convenient for debug; however: this line exposes all environment variable values - including any secret values they may contain
    console.log(`Environment variable ${env.name} is set to : ${process.env[env.name]}`);  
  }
}


const app = express()
    .use(bodyParser.urlencoded({ extended: true }))
    ;

const server = http.createServer(app);

server.listen(PORT, function listening() {
    console.log('Listening on %d', server.address().port);
});

app.get('/about', function (req, res) {
    var msg = req.body;
    console.log(msg)

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("About CQRS from Twitter or Kafka to MongoDB:");
    res.write(`No endpoints are supported; this application responds to Tweets with hashtag ${process.env.TWITTER_HASHTAG} and events on Kafka Topic ${process.env.KAFKA_TOPIC}`);
    res.write("incoming headers" + JSON.stringify(req.headers));
    res.end();
});

eventListener.subscribeToEvents(function (orderPayload) {
    order = JSON.parse(orderPayload)
    console.log("Order from Event is " + order);
    ordersAPI.insertOrderIntoDatabase(order)
}
)

