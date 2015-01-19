var {flatten} = require('lodash');
var Firebase = require('firebase');
var Firepad = require('firepad');

var status = require('./status-message');
var View = require('./test-view');

console.log('loading covalent');
var id = 'Project-' + Math.floor(Math.random() * 999999);

module.exports = {

  config: require('./config'),

  pads: {},

  activate(state) {
    console.log('activating covalent');
    atom.workspaceView.command('covalent:create-project', () => {
      this.share();
      this.setFileList();
    });
    atom.workspaceView.command('covalent:join', () => {
      this.join();
    });
    atom.workspaceView.command('covalent:leave', () => {
      this.unshare();
    });
  },

  setFileList() {
    var ref = this.getFbRef();
    ref.child('project-name').set(atom.project.path || 'untitled');
    ref.child('files').set(this.getAllFileNames());
  },

  share() {
    var ref = this.getFbRef();
    var editor = atom.workspace.getActiveEditor();
    this.pads[id] = Firepad.fromAtom(ref, editor, {
      sv_: Firebase.ServerValue.TIMESTAMP,
      overwrite: true
    });
    console.log(`sharing this file under ${id}`);
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
    var fbUrl = atom.config.get('atom-covalent.firebaseUrl');
    if (!fbUrl) {
      // TODO:: This  message should be visible somewhere when you try and share
      console.log('You need to set your firebase url in settings!');
    } else {
      return new Firebase(fbUrl).child(id);
    }
  },

  deactivate() {

  },

  serialize() {

  }

}
