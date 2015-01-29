var {flatten} = require('lodash');
var Firebase = require('firebase');
var Firepad = require('./firepad-patches/firepad');

var status = require('./atom-patches/status-message');
var View = require('./atom-patches/test-view');

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
        this.setFileList();
      },
      'covalent:join': () => {
        this.join();
      },
      'covalent:leave': () => {
        this.unshare();
      }
    });
  },

  setFileList() {
    var ref = this.getFbRef();
    ref.child('project-name').set(atom.project.path || 'untitled');
    ref.child('files').set(this.getAllFileNames());
  },

  share() {
    var editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      this.error('You must have an editor open to start sharing.');
      return;
    }
    var ref = this.getFbRef();
    this.pads[id] = Firepad.fromAtom(ref, editor, {
      sv_: Firebase.ServerValue.TIMESTAMP,
      overwrite: true
    });

    var msg = status(`This file shared at ${id}`);
  },

  join() {
    console.log('joining');
    // show view where you ask for id
    // atom.views.addViewProvider(View);
    // debugger;
    var view = atom.views.createView(View());
    atom.workspaceView.append(view);

    var msg = status(`This file shared at ${id}`);

    setTimeout(() => {
      view.remove();
      msg.remove();
    }, 15000);
    // on cancel, do nothing
    // on accept, confirm(id)
  },

  confirm(_id) {
    console.log('connect to firebase project with id ${_id}');
  },

  unshare() {
    this.pads[id].dispose();
    console.log('unsharing the file');
  },

  getAllFileNames(directory=atom.project.rootDirectory) {
    if (directory == null) return [];
    return flatten(directory.getEntriesSync().map((item) => {
      if (item.isFile()) {
        return item.getPath();
      } else if (item.isDirectory()) {
        if (item.getBaseName() === 'node_modules') return [];
        return this.getAllFileNames(item);
      }
    }));
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
  },

  deactivate() {

  },

  serialize() {

  }

};
