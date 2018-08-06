global.window = global;
global.assert = require('chai').assert;
require('../src/static/socialnet');
require('./socialnet.spec.js');
