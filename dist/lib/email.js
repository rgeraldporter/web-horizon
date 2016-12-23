'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.email = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailgunConig = {
    domain: 'sandbox6903d7f2aaef455a92d834c00c70b586.mailgun.org',
    apiKey: process.env.MAILGUN_KEY || null
};

var message = {
    from: 'Web-Horizons <rob@inpictures.ca>',
    to: 'rob@weeverapps.com',
    subject: 'Horizons Browser Report'
};

var email = function email(diff) {

    if (process.env.NODE_ENV === 'test') {
        return;
    }

    var mailgun = (0, _mailgunJs2.default)(mailgunConig);

    var emailMessage = (0, _assign2.default)(message, { text: diff.toString() });
    diff && mailgun.messages().send(emailMessage, function (error, body) {
        console.log('Emailed: ', body);
    });
};

exports.email = email;