#Atom-Covalent

Saw the [atom-firepad] project and loved it. There were a couple quirks though. When I dug into the code to fix them, I found it was all coffeescript :(. I'm creating a new project so that

1. I can learn how to make atom packages and
2. I don't have to deal with coffeescript.

After that, I do want to take it a lot farther than the current firepad package has gone.

Name comes from this [post] by [bsima]. Thanks!

###Version One
- Feature Parity with [atom-firepad] with bug fixes:
 - Show shared cursors
 - Auto-generate share IDs
 - Ability to specify your own firebase / auth token
 - Ability to share/unshare multiple files
 - Disallow sharing the same file twice
 - Clear indication as to which files are being shared (and their key) in an unobtrusive way

###Beyond
- Share a file (current file)
- Share a workspace (every tab you have open)
- Share a project (everything in your project)
- Save file on all shared computers on save (to trigger things like webpack and live-reload)

[post]: https://news.ycombinator.com/item?id=7317042
[bsima]: https://news.ycombinator.com/user?id=bsima
[atom-firepad]: https://github.com/firebase/atom-firepad
