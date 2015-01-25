var toDOM = require('./toDOM');

module.exports = function () {
  var dom = toDOM(`
    <div class="overlay from-top mini">
      <atom-text-editor class="editor mini" mini></atom-text-editor>
      <div class="message">Enter your access code</div>
    </div>
  `);
  return dom;
};
