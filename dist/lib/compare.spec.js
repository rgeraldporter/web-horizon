'use strict';

var _compare = require('./compare');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var caniuse = require('caniuse-api');
var stable = caniuse.getLatestStableBrowsers();

describe('The comparison functions', function () {

    it('should comapre two arrays for new browsers', function () {

        var stableNow = caniuse.getLatestStableBrowsers();
        stableNow.push('new browser');
        var diff = stableNow.reduce(_compare.compareStable, []);
        expect(diff.length).toBe(1);
    });
});