// 6to5's require doesn't load this right...
var Firepad = require('./lib/firepad');

require('6to5/register');
module.exports = require('./lib/covalent')(Firepad);
