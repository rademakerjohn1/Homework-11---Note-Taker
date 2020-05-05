const util = require('util')
const fs = require('fs')
const path = require('path');
const uuidv1 = require('uuidv1');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {

  read() {
    return readFileAsync(path.join(__dirname, "db.json"), "utf8");
  }

  write(note) {
    return writeFileAsync(path.join(__dirname, "db.json"), JSON.stringify(note))
  }

  // parse the JSON string and turn into an object // add them to a list // return that list (array)
  getNotes() {
    return this.read().then(notes => {
      var notesObject = JSON.parse(notes);
      return notesObject;
    });
  }

  // use the note argument // create a new note object with your required fields (text, title, id) // write that object to the json file
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    const newNote = { title, text, id: uuidv1() };
    return this.getNotes()
      .then(notes => {
        notes.unshift(newNote);
        return this.write(notes);
      })
  }
  
  // get all notes // remove the note with the given id // and return a list of notes that does NOT have that id (in essence the filtered list)
  removeNote(id) {
  return this.getNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(filteredNotes => this.write(filteredNotes))
  }
}

module.exports = new Store()