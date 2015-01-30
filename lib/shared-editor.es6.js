var Firebase = require('firebase');
var Firepad = require('./firepad-patches/firepad');

var status = require('./atom-patches/status-message');

module.exports = function (editor, ref, id) {
  var pad = Firepad.fromAtom(ref, editor, {
    sv_: Firebase.ServerValue.TIMESTAMP,
    overwrite: true
  });

  var msg = status(`This file shared at ${id}`);

  return pad;
};
