'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = undefined;

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var client = new _twitter2.default({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var post = function post(tweet) {
    return client.post('statuses/update', { status: tweet }).then(function (tweet) {
        return _logger2.default.info('Tweeted: ', tweet);
    }).catch(function (error) {
        return _logger2.default.error('Error tweeting:', tweet);
    });
};

exports.post = post;