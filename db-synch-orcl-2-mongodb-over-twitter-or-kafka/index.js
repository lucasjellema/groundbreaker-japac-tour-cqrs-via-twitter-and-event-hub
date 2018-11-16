// listen to post requests about new or changed orders - and turn them into a Tweet message
var express = require('express') //npm install express
    , bodyParser = require('body-parser') // npm install body-parser
    , http = require('http')
    ;
var PORT = process.env.PORT || 3000;


const app = express()
    .use(bodyParser.urlencoded({ extended: true }))
    ;

const server = http.createServer(app);

const REQUIRED_ENVIRONMENT_SETTINGS = [
    {name:"PUBLISH_TO_KAFKA_YN" , message:"with either Y (publish event to Kafka) or N (publish to Twitter instead)"},
    {name:"KAFKA_SERVER" , message:"with the IP address of the Kafka Server to which the application should publish"},
    {name:"KAFKA_TOPIC" , message:"with the name of the Kafka Topic to which the application should publish"},
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
    // console.log(`Environment variable ${env.name} is set to : ${process.env[env.name]}`);  
  }
}

server.listen(PORT, function listening() {
    console.log('Listening on %d', server.address().port);
});

app.get('/about', function (req, res) {
    var msg = req.body;
    console.log(msg)

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("About Tweeting REST API:");
    res.write("incoming headers" + JSON.stringify(req.headers));
    res.end();
});

console.log("Publishing to Kafka or Twitter?")
console.log("Environment Variable PUBLISH_TO_KAFKA_YN ="+process.env.PUBLISH_TO_KAFKA_YN)
var publishOrderSynchEventOverKafka = (process.env.PUBLISH_TO_KAFKA_YN||'N')=='Y';
console.log("publishOrderSynchEventOverKafka ="+publishOrderSynchEventOverKafka)
var twitterHashTag = process.env.TWITTER_HASHTAG || "#japacorderevent"
app.get('/order', function (req, res) {
    console.log("handle order event");
    console.log(req.query)
    var customerName = req.query.customerName;
    console.log("Customer " + customerName)
    var result = { "summary": "tremendous success!" }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));

    if (!(publishOrderSynchEventOverKafka)) {
        // now tweet the order event
        var tweetMsg = twitterHashTag+ " " + JSON.stringify(req.query);
        console.log("Tweeted: "+tweetMsg)
        tweet.postMessage(tweetMsg);
    } else {
        eventBusPublisher.publishEvent("NewJAPACOrderEvent", {
            "eventType": "NewJAPACOrderEvent"
            , "order": req.query
            , "module": "database-synchronizer"
            , "timestamp": Date.now()
        }, topicName);
        console.log("Published Kafka Event of type NewJAPACOrderEvent to Event Hub ")
    }

});

eventBusPublisher = require("./EventPublisher.js");
// from the Oracle Event Hub - Platform Cluster Connect Descriptor
var topicName = process.env.KAFKA_TOPIC || "ordersTopic";
var tweet = require("./tweet");
