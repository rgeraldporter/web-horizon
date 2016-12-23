'use strict';

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _compare = require('./lib/compare');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// every hour
_nodeCron2.default.schedule('0 * * * *', _compare.compareCheck);

// first time run through.
(0, _compare.compareCheck)();