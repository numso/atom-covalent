var {flatten} = require('lodash');
var Firebase = require('firebase');
var sharedEditor = require('./shared-editor');

var status = require('./atom-patches/status-message');
var myPrompt = require('./atom-patches/prompt');

console.log('loading covalent');
// var id = 'Project-' + Math.floor(Math.random() * 999999);
var id = 'fooey';

module.exports = {

  config: require('./config'),

  pads: {},

  activate(state) {
    console.log('activating covalent');

    atom.commands.add('atom-workspace', {
      'covalent:create-file': () => {
        this.share();
      },
      'covalent:join': () => {
        this.join();
      },
      'covalent:leave': () => {
        this.unshare();
      }
    });
  },

  deactivate() {

  },

  serialize() {

  },

  share() {
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor) return this.error('You must have an editor open to start sharing.');
    var ref = this.getFbRef();
    this.pads[id] = sharedEditor(editor, ref, id);
  },

  join() {
    console.log('joining');
    myPrompt('Enter your access code').then(() => {
      debugger;
      // on cancel, do nothing
      // on accept, confirm(id)
    });
  },

  confirm(_id) {
    console.log('connect to firebase project with id ${_id}');
  },

  unshare() {
    this.pads[id].dispose();
    console.log('unsharing the file');
  },

  getFbRef() {
    var fbUrl = 'https://covalent.firebaseio.com/first';
    // var fbUrl = atom.config.get('atom-covalent.firebaseUrl');
    if (!fbUrl) return this.error('You need to set your firebase url in settings!');
    // TODO:: Honor the auth token. if it doesn't connect, thow an error
    return new Firebase(fbUrl).child(id);
  },

  error(err) {
    // needs to be a nice error view
    console.error(err);
    throw new Error(err);
  }

};

// setFileList() {
//   var ref = this.getFbRef();
//   ref.child('project-name').set(atom.project.path || 'untitled');
//   ref.child('files').set(this.getAllFileNames());
// },

// getAllFileNames(directory=atom.project.rootDirectory) {
//   if (directory == null) return [];
//   return flatten(directory.getEntriesSync().map((item) => {
//     if (item.isFile()) {
//       return item.getPath();
//     } else if (item.isDirectory()) {
//       if (item.getBaseName() === 'node_modules') return [];
//       return this.getAllFileNames(item);
//     }
//   }));
// },
