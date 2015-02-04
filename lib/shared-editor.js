'use 6to5';

var Firebase = require('firebase');
var Firepad = require('./firepad-patches/firepad');

var status = require('./atom-patches/status-message');

module.exports = function (editor, ref, id) {

  editor.firepadDestroy = () => {
    pad.dispose();
    msg.remove();
    editor.firepadDestroy = null;
    // kill any firebase listeners as well
    // TODO:: destroy all foreign cursors and selections
  }

  var pad = Firepad.fromAtom(ref, editor, {
    sv_: Firebase.ServerValue.TIMESTAMP
  });

  var msg = status(`This file shared at ${id}`);

  editor.onDidDestroy(() => {
    // editor is dead. kill the firebase connection
    editor.firepadDestroy();
  });

  editor.onDidSave(() => {
    // editor saved. mark it as saved on firebase so that listeners can save too
  });

  // on lost focus, remove the msg
  // on gained focus, put the msg back up

  // listen on firebase for a save event for my file
};
