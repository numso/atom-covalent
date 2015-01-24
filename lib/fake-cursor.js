var marker;

// this should replace the AtomAdapter method
module.exports = function drawFakeStuffAt(cursor, color, clientId) {
  if (marker) marker.destroy();
  if (cursor.position === cursor.selectionEnd) drawFakeCursor(cursor.position);
  else drawFakeSelection(cursor.position, cursor.selectionEnd)
};


// the way cursor get's drawn gives weirdness on col 1
function drawFakeCursor(pos) {
  var editor = atom.workspace.getActiveEditor();
  var point = editor.buffer.positionForCharacterIndex(pos);
  var point2 = editor.buffer.positionForCharacterIndex(pos - 1);
  var range = [point2, point];
  marker = editor.markBufferRange(range, { invalidate: 'never' });
  editor.decorateMarker(marker, {
    type: 'highlight',
    class: 'covalent-cursor'
  });
}

function drawFakeSelection(pos, endPos) {
  var editor = atom.workspace.getActiveEditor();
  var point = editor.buffer.positionForCharacterIndex(pos);
  var point2 = editor.buffer.positionForCharacterIndex(endPos);
  var range = [point, point2];
  marker = editor.markBufferRange(range, { invalidate: 'never' });
  var decoration = editor.decorateMarker(marker, {
    type: 'highlight',
    class: 'covalent'
  });
}
