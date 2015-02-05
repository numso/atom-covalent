'use 6to5';

var {flatten} = require('lodash');
var Firebase = require('firebase');
var createSharedEditor = require('./shared-editor');

var status = require('./atom-patches/status-message');
var myPrompt = require('./atom-patches/prompt');

console.log('loading covalent');

module.exports = {

  config: require('./config'),

  sharedEditors: [],

  activate(state) {
    console.log('activating covalent');

    // TODO:: only show these if a connection hasn't been started
    atom.commands.add('atom-workspace', {
      'covalent:create-file': this.create.bind(this),
      'covalent:join': this.join.bind(this),
      'covalent:leave': this.leave.bind(this)
    });

    atom.workspace.onDidChangeActivePaneItem(editor => {
      // unfocus all available sharing messages
      this.sharedEditors.forEach(e => e.removeFirepadMessage());
      // if the focused editor has a message, show it
      if (editor && editor.firepadCreateMessage) editor.firepadCreateMessage();
    });
  },

  deactivate() {

  },

  serialize() {

  },

  create() {
    console.log('creating shared file');
    var id = '' + Math.floor(Math.random() * 99999);
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor) return this.error('You must have an editor open to create a shared file.');
    if (editor.firepad) return this.error('This file is already shared');
    var ref = this.getFbRef(id);
    var e = createSharedEditor(editor, ref, id);
    this.sharedEditors.push(e);
  },

  join() {
    console.log('joining');
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor) return this.error('You must have an editor open to join a shared file.');
    if (editor.firepad) return this.error('This file is already shared');
    myPrompt('Enter your access code').then(id => {
      var ref = this.getFbRef(id);
      var e = createSharedEditor(editor, ref, id);
      this.sharedEditors.push(e);
    });
  },

  leave() {
    console.log('leaving the shared file');
    // TODO:: send an event to the shared editor
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor) return this.error('You must have an editor open to leave a shared file.');
    if (!editor.firepad) return this.error('You aren\'t currently sharing anything');
    editor.firepadDestroy();
  },

  getFbRef(id) {
    var fbUrl = 'https://covalent.firebaseio.com/first';
    // var fbUrl = atom.config.get('atom-covalent.firebaseUrl');
    if (!fbUrl) return this.error('You need to set your firebase url in settings!');
    // TODO:: Honor the auth token. if it doesn't connect, thow an error
    return new Firebase(fbUrl).child(id);
  },

  error(err) {
    // TODO:: needs to be a nice error view
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
