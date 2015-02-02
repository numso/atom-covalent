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

      // add event listeners
      input.onblur = () => {
        dom.remove();
        reject();
      };

      input.onkeydown = e => {
        if (e.keyCode === 27) { // esc
          dom.remove();
          reject();
        }
        if (e.keyCode === 13) { // enter
          debugger; // Where is the actual text???
          dom.remove();
          resolve(e.target.value);
        }
        // console.log(e.target.shadowRoot.querySelector('input').value);
      };

    // });
  });
};
