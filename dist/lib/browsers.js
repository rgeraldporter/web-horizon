'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bhttp = require('bhttp');

var _bhttp2 = _interopRequireDefault(_bhttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataUrl = 'https://raw.githubusercontent.com/Fyrd/caniuse/master/sample-data.json';

var get = function get() {
    return _bluebird2.default.try(function () {
        return _bhttp2.default.get(dataUrl);
    }).then(function (response) {
        return JSON.parse(response.body.toString()).stats;
    });
};

var name = {
    ios_saf: {
        name: 'Mobile Safari'
    },
    ie: {
        name: 'Internet Explorer'
    },
    edge: {
        name: 'Microsoft Edge'
    },
    firefox: {
        name: 'Firefox'
    },
    chrome: {
        name: 'Chrome'
    },
    safari: {
        name: 'Safari'
    },
    opera: {
        name: 'Opera'
    },
    op_mini: {
        name: 'Opera Mini'
    },
    android: {
        name: 'Android Browser'
    },
    bb: {
        name: 'BlackBerry Browser'
    },
    op_mob: {
        name: 'Opera Mobile'
    },
    and_chr: {
        name: 'Android Chrome'
    },
    and_ff: {
        name: 'Android Firefox'
    },
    ie_mob: {
        name: 'Internet Explorer Mobile'
    },
    and_uc: {
        name: 'Android UC Browser'
    },
    samsung: {
        name: 'Samsung Browser'
    },
    and_qq: {
        name: 'Android QQ Browser'
    }
};

exports.default = { get: get, name: name };