var toDOM = require('../toDom');

module.exports = function (editor, pos, color) {

  var marker;

  var myClass = 'covalent-' + Math.floor(Math.random() * 999999);
  var styles = toDOM(`
    <style>
      ::shadow .${myClass} .region {
        border-right: 2px solid ${color} !important;
      }
    </style>
  `);
  document.querySelector('atom-styles').appendChild(styles)

  // the way cursor get's drawn gives weirdness on col 1
  var point = editor.buffer.positionForCharacterIndex(pos - 1);
  var point2 = editor.buffer.positionForCharacterIndex(pos);
  var range = [point, point2];
  marker = editor.markBufferRange(range, { invalidate: 'never' });
  var decoration = editor.decorateMarker(marker, {
    type: 'highlight',
    class: 'covalent-cursor ' + myClass
  });

  function clear() {
    if (marker) marker.destroy();
    styles.remove();
  }

  return { clear };
};
