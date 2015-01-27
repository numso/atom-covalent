var toDOM = require('../toDom');

module.exports = function (editor, pos, endPos, color) {

  var marker;

  var myClass = 'covalent-' + Math.floor(Math.random() * 999999);
  var styles = toDOM(`
    <style>
      ::shadow .${myClass} .region {
        background-color: ${color} !important;
      }
    </style>
  `);
  document.querySelector('atom-styles').appendChild(styles)


  var point = editor.buffer.positionForCharacterIndex(pos);
  var point2 = editor.buffer.positionForCharacterIndex(endPos);
  var range = [point, point2];
  marker = editor.markBufferRange(range, { invalidate: 'never' });
  var decoration = editor.decorateMarker(marker, {
    type: 'highlight',
    class: 'covalent-selection ' + myClass
  });

  function clear() {
    if (marker) marker.destroy();
    styles.remove();
  }

  return { clear };
};
