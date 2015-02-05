# Atom-Covalent

A plugin to share your editor for collaborative coding.

### Usage

Firstly: register for a firebase account, go to atom settings, and put in a firebase url to host your projects.

- `Covalent: Create File` shares the currently opened editor with a random id
- `Covalent: Join` prompts you for a share id and joins that share with the current editor.
- `Covalent: Leave` leaves the sharing session for the current editor.

Whenever the editor you are using is being shared, the id with which it is being shared is below in the status bar.

Careful when joining. The contents of your currently opened editor will be overwritten by whatever's being shared.

### Motivation

I saw the [atom-firepad] project and loved it. There were a couple quirks though. When I dug into the code to fix them, I found it was all coffeescript :(. I'm creating a new project so that:

1. I can learn how to make atom packages and
2. I don't have to deal with coffeescript.

After that, I do want to take it a lot farther than the current firepad package has gone.

Name comes from this [post] by [bsima]. Thanks!

### Version One
- Feature Parity with [atom-firepad] with bug fixes:
 - [x] Show shared cursors/selections
 - [x] Auto-generate share IDs
 - [x] Ability to specify your own firebase / auth token
 - [x] Ability to share/unshare multiple files
 - [x] Disallow sharing the same file twice
 - [x] Clear indication as to which files are being shared (and their key) in an unobtrusive way
 - [ ] Display better error msgs

### Bugs
- [x] Remove cursors/selections on covalent:leave
- [ ] If no Firebase URL exists, use a default?
- [ ] Honor Firebase Auth Token
- [x] Hide sharing msg on blur
- [ ] multiple pane view of same file is NOT same editor... (buffer's are the same though)
- [ ] If the cursor is on column 1, another cursor is drawn at the end of the previous line
- [ ] Unable to draw cursor at column 1 row 1
- [ ] If you clear a selection by hitting right or left, selection isn't cleared in shared editors

### Beyond
- [x] Share a file (current file)
- [ ] Share a workspace (every tab you have open)
- [ ] Share a project (everything in your project)
- [ ] Save file on all shared computers on save (to trigger things like webpack and live-reload)

[post]: https://news.ycombinator.com/item?id=7317042
[bsima]: https://news.ycombinator.com/user?id=bsima
[atom-firepad]: https://github.com/firebase/atom-firepad
