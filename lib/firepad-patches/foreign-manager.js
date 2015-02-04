'use 6to5';

// this should replace the AtomAdapter method

var drawForeignCursor = require('../atom-patches/foreign-cursor');
var drawForeignSelection = require('../atom-patches/foreign-selection');

module.exports = (function () {
  return function foreignManager(editor, cursor, color, clientId) {
    var pos = cursor.position;
    var pos2 = cursor.selectionEnd;

    if (pos === pos2) return drawForeignCursor(editor, pos, color);
    return drawForeignSelection(editor, pos, pos2, color);
  };
}());
