'use 6to5';

var toDOM = require('../helpers/toDOM');

module.exports = function (text) {
  var dom = toDOM(`
    <div class="overlay from-top mini">
      <atom-text-editor class="editor mini" mini></atom-text-editor>
      <div class="message">${text}</div>
    </div>
  `);

  // mount it on the DOM
  atom.workspaceView.append(dom);

  return new Promise((resolve, reject) => {
    // dom.onDidAttach(() => {
      var input = dom.querySelector('atom-text-editor')
      input.focus();

      var responded = false;

      // add event listeners
      input.onblur = () => {
        if (responded) return;
        dom.remove();
        reject();
      };

      input.onkeydown = e => {
        if (e.keyCode === 27) { // esc
          responded = true;
          dom.remove();
          reject();
        }
        if (e.keyCode === 13) { // enter
          responded = true;
          var text = e.target.shadowRoot.querySelector('.text').textContent;
          dom.remove();
          resolve(text);
        }
      };

    // });
  });
};
