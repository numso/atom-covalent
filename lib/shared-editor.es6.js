var Firebase = require('firebase');
var Firepad = require('./firepad-patches/firepad');

var status = require('./atom-patches/status-message');

module.exports = function (editor, ref, id) {

  function destroy() {
    pad.dispose();
    msg.remove();
    // kill any firebase listeners as well
  }

  var pad = Firepad.fromAtom(ref, editor, {
    sv_: Firebase.ServerValue.TIMESTAMP,
    overwrite: true
  });

  var msg = status(`This file shared at ${id}`);

  editor.onDidDestroy(() => {
    // editor is dead. kill the firebase connection
    destroy();
  });

  editor.onDidSave(() => {
    // editor saved. mark it as saved on firebase so that listeners can save too
  });

  // on lost focus, remove the msg
  // on gained focus, put the msg back up

  // listen on firebase for a save event for my file

  return pad;
};
