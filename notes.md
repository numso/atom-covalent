# How OT is stored in firebase

### Example

```javascript
{
  "nB4oo2WL2WDOa6KwR8wHcdSLs4gnfhRCV2OnxY=": { // id of the project?
    "checkpoint": {                  // the state of the document, saved every couple minutes.
      "a": "-JfsnqyG3SX1NPM9Pte0",   // id of the user who made the change
      "id": "B3D",                   // id of the change the checkpoint is referring to
      "o": [  "div#foo.b" ]          // the state of the document at that change
    },
    "history": {                     // meat of the project. stores TONS changes
      "AT": {                        // id of the change. these are sequential
        "a": "-JfsnqyG3SX1NPM9Pte0", // id of the user who made the change
        "o": [                       // list of changes. excluded if 0 or blank
          15,                        // number of characters before change
          "h",                       // characters to add
          -1,                        // number of characters to delete
          12                         // number of characters after change
        ],
        "t": 1421513880689           // timestamp of change
      }
    },
    "users": {                       // list of users currently connected
      // info about users
      // id, cursor loc, stuff....
      // i forget actual format
    }
  }
}
```

# Use Cases
1. Just wanna show you a snippet of code
2. Need help debugging my project
3. Let's collab on a project (but I want separate branches still)

# Settings
 - Firebase url
 - Firebase auth token (optional)

# Project Flow

1. user A creates a project
2. user A's project is immediately synced to firebase
3. user B joins the project, specifying an empty folder on his computer
4. a new editor is opened and the host project get's synced to the folder he specified
5. user A calls it a night and logs off
6. user B keeps hacking
7. One of:
  - user A joins, specifies the same folder, and all the changes are applied in his project
  - user A hacks some, joins, specifies the same folder and gets a warning about overriding changes
  - user A hacks some, joins, specifies a new folder, syncs the project, pastes his changes in

# Command Palette Options

 - create from project --> Enter project name --> if blank, id generated for you and put on clipboard --> if exists (msg: already exists)
 - create from file --> Enter file name --> if blank, id generated for you and put on clipboard --> if exists (msg: already exists)
 - join --> Enter project/file name --> Enter project/file path -- if blank, we store it in /tmp --> if exists (msg: override? Y/n)
 - delete --> Enter project/file name

# Todo

 - show the external user's cursors
 - show the external user's selections
 - share an entire project
 - show who's logged in and which file they're viewing
 - Bonus: Show history? ability to revert? all the data's there already...

# Ideas

 - `.covalent-ignore` file of list to not sync
 - some way to specify white/black list syncable git branches
   - if that's the case, how do we resync on rebase?
