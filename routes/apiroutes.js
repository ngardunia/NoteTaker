const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

module.exports = (router) => {

// GET Route for retrieving new notes
router.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
router.post('/api/notes', (req, res) => {

  const { title, note } = req.body;

  if (req.body) {
    const newNote = {
      title,
      note,
      id: uuidv4()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

router.delete('api/notes/:id', (req, res) => {
    let database = JSON.parse(readFromFile('./db/db.json'))
    let noteDelete = database.filter(item => item.id !== req.params.id);

    writeToFile('./db/db.json', JSON.stringify(noteDelete));
    res.json(noteDelete);
})

};