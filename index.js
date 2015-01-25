require('6to5/register')({

  ignore: /node_modules/,

  extensions: ['.es6.js']

});

module.exports = require('./lib/covalent');
