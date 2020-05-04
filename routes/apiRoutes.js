var router = require("express").Router();
var store = require("../db/store");

router.get("/notes", function(req, res) {
    store.getNotes().then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));;
});

router.post("/notes", (req, res) => {
    store.addNote(req.body)
      .then((note) => res.json(JSON.parse(note)))
      .catch(err => res.status(500).json(err));
  });

router.delete("/notes/:req", function(req, res) {
  store.getNotes()
  .then(store.removeNote(req))
  .then(store.getNotes())
});
  
module.exports = router;