var Twit = require('twit');
var ordersAPI = require('./orders-api');

const { twitterconfig } = require('./twitterconfig');
var T = new Twit({
  consumer_key: twitterconfig.consumer_key,
  consumer_secret: twitterconfig.consumer_secret,
  access_token: twitterconfig.access_token_key,
  access_token_secret: twitterconfig.access_token_secret,
  timeout_ms: 60 * 1000,
});

var twitterHashTag = process.env.TWITTER_HASHTAG||"#Trump";

var tracks = { track: [twitterHashTag] };
let tweetStream = T.stream('statuses/filter', tracks)
tweetstream(tracks, tweetStream);

function tweetstream(hashtags, tweetStream) {
  console.log("Started tweet stream for hashtag " + JSON.stringify(hashtags));

  tweetStream.on('connected', function (response) {
    console.log("Stream connected to twitter for " + JSON.stringify(hashtags));
  })
  tweetStream.on('error', function (error) {
    console.log("Error in Stream for #" + JSON.stringify(hashtags) + " " + error);
  })
  tweetStream.on('tweet', function (tweet) {
    processTweetEvent(tweet);
  });
}


function processTweetEvent(tweet) {
  console.log("tweet text " + tweet.extended_tweet.full_text.substring(twitterHashTag.length));
  var order = JSON.parse(tweet.extended_tweet.full_text.substring(twitterHashTag.length));

  console.log("Order from Tweet is " + JSON.stringify(order));

  order.id = order.orderId;
  ordersAPI.insertOrderIntoDatabase(order)
}
