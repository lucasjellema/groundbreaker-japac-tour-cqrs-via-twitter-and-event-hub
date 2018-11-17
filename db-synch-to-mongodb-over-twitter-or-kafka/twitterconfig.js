// go to https://apps.twitter.com/ to register your app
var twitterconfig = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || 'SHaB04A',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET||'u0COiw7zbpLWFY',
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY||'91608274374',
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET||'iCx44bvHN'  
    };

    module.exports = {twitterconfig};