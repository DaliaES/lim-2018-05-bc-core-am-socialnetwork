global.window = global;
global.assert = require('chai').assert;
require('../src/static/validation');
require('./socialnet.spec.js');
