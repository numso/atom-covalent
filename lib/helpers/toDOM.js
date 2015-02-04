'use 6to5';

module.exports = function (html) {
  var d = document.createElement('div');
  d.innerHTML = html;
  return d.children[0];
};
