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
    return writeFileAsync(path.join(__dirname, "db.json"), JSON.stringify(note) || [])
  }

  // parse the JSON string and turn into an object
  // add them to a list
  // return that list (array)
  getNotes() {
    return this.read().then(notes => {
      var notesObject = JSON.parse(notes);
      return notesObject;
    });
  }

  // use the note argument
  // create a new note object with your required fields (text, title, id)
  // write that object to the json file
  addNote(note) {

    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    const newNote = { title, text, id: uuidv1() };
    return this.getNotes()
      .then(notes => {
        notes.push(newNote);
        return this.write(notes);
      })
  }
    
    // .then(notes => {
    //   newNoteArray = [...notes, newNote];
    //   this.write(newNoteArray)
    // });


    // return this.getNotes().then(this.getNotes());

    // Get all notes, add the new note, write all the updated notes, return the newNote
    // return this.getNotes()
    //   .then(notes => [...notes, newNote])
    //   .then(updatedNotes => this.write(updatedNotes))
    //   .then(() => newNote);
      
    // use the note argument
    // create a new note object with your required fields (text, title, id)
    // write that object to the json file
 

  removeNote(id) {
    this.getNotes()
  
    // get all notes
    // remove the note with the given id
    // and return a list of notes that does NOT have that id (in essence the filtered list)
  }

}

module.exports = new Store()