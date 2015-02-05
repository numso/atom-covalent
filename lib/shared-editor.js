'use 6to5';

var Firebase = require('firebase');
var Firepad = require('./firepad-patches/firepad');

var status = require('./atom-patches/status-message');

module.exports = function (editor, ref, id) {
  var msg, pad;

  editor.firepadDestroy = () => {
    pad.dispose();
    msg.remove();
    editor.firepadDestroy = null;
    editor.firepadCreateMessage = null;
    // kill any firebase listeners as well
    // TODO:: destroy all foreign cursors and selections
  };

  editor.firepadCreateMessage = () => {
    msg = status(`This file shared at ${id}`);
  };

  ref.once('value', snap => {
    var options = { sv_: Firebase.ServerValue.TIMESTAMP };
    if (!snap.val() && editor.getText() != '') options.overwrite = true;
    else editor.setText('');
    pad = Firepad.fromAtom(ref, editor, options);
    msg = status(`This file shared at ${id}`);
  });


  editor.onDidDestroy(() => {
    // editor is dead. kill the firebase connection
    if (editor.firepadDestroy) editor.firepadDestroy();
  });

  editor.onDidSave(() => {
    // editor saved. mark it as saved on firebase so that listeners can save too
  });

  // on lost focus, remove the msg
  // on gained focus, put the msg back up

  // listen on firebase for a save event for my file

  return {
    removeFirepadMessage() {
      msg.remove();
    }
  };
};
