// 6to5's require doesn't load this right...
var firepad = require('./lib/firepad-patches/firepad');

require('6to5/register');

// I'm putting all my changes in here and trying to leave Firepad itself unchanged
firepad.AtomAdapter = require('./lib/firepad-patches/atom-adapter')(firepad);

module.exports = require('./lib/covalent')(firepad.Firepad);
