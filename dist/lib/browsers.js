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

exports.default = { get: get };