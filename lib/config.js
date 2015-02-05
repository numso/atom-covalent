'use 6to5';

module.exports = {

  firebaseUrl: {
    title: 'Firebase URL',
    type: 'string',
    default: 'https://covalent.firebaseio.com/prod'
  },

  firebaseAuthToken: {
    title: 'Firebase Auth Token (optional)',
    type: 'string',
    default: ''
  }

};
