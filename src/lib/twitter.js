import Twitter from 'twitter';
import logger from './logger';

require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const post = tweet =>
    client
        .post('statuses/update', { status: tweet })
        .then(tweet => logger.info('Tweeted: ', tweet))
        .catch(error => logger.error('Error tweeting:', tweet));

export { post };
