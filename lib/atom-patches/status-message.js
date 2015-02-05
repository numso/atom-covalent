'use 6to5';

var toDOM = require('../helpers/toDOM');

module.exports = function (msg) {

  var statusBar = document.querySelector('status-bar');
  var item, tile;

  if (statusBar) {
    item = toDOM(`
      <div class="inline-block">${msg}</div>
    `)
    tile = statusBar.addLeftTile({ item });
  }

  function remove() {
    if (tile != null) {
      tile.destroy();
      tile = null;
    }
  }

  function setText(text) {
    if (statusBar) item.innerHTML = text;
  }

  return {
    setText,
    remove
  };

}
