// this should replace the AtomAdapter method

var drawForeignCursor = require('../atom-patches/foreign-cursor');
var drawForeignSelection = require('../atom-patches/foreign-selection');

module.exports = (function () {

  var cursors = {};
  var selections = {};

  function removeCursor(clientId) {
    if (cursors[clientId]) {
      cursors[clientId].remove();
      delete cursors[clientId];
    }
  }

  function removeSelection(clientId) {
    if (selections[clientId]) {
      selections[clientId].remove();
      delete selections[clientId];
    }
  }

  return function foreignManager(editor, cursor, color, clientId) {
    var pos = cursor.position;
    var pos2 = cursor.selectionEnd;

    removeSelection(clientId);
    removeCursor(clientId);

    if (pos === pos2) {
      cursors[clientId] = drawForeignCursor(editor, pos, color);
    } else {
      selections[clientId] = drawForeignSelection(editor, pos, pos2, color);
    }
  };
}());
