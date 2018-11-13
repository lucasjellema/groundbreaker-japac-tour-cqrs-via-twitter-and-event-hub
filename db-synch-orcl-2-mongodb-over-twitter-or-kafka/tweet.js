var tweet=     module.exports ;
var Twit = require('twit');

const { twitterconfig } = require('./twitterconfig');


var T = new Twit({
  consumer_key: twitterconfig.consumer_key,
  consumer_secret: twitterconfig.consumer_secret,
  access_token: twitterconfig.access_token_key,
  access_token_secret: twitterconfig.access_token_secret,
  timeout_ms: 60 * 1000,
});

//https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update 
tweet.postMessage = function (message) {
T.post('statuses/update', { status: 
    message }, function(err, data, response) {
      if(err) {
        console.log("Error in Tweeting "+err);
      }
    console.log(data)
  })
}