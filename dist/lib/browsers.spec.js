'use strict';

var _browsers = require('./browsers.js');

var _browsers2 = _interopRequireDefault(_browsers);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The browser value', function () {
    it('should exist', function (done) {
        _browsers2.default.get().then(function (list) {
            expect(list.ie['10']).toBe('u');
            done();
        }).catch(function (err) {
            console.error('err', err);
        });
    });
});