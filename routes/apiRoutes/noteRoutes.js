const router = require('express').Router();

const { validateNote, createNewNote, saveNotesToDB } = require('../../lib/notes');

const storedNotes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    /*
    let results = storedNotes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    */
   res.json(storedNotes);
});

router.post('/notes', (req, res) => {
    // req.body is where our incoming content will be
    req.body.id = (storedNotes.length + 1).toString();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        const note = createNewNote(req.body, storedNotes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const idMatches = (note) => note.id === req.params.id;
    const indexToRemove = storedNotes.findIndex(idMatches);

    if (indexToRemove > -1) {
        storedNotes.splice(indexToRemove, 1);
        saveNotesToDB(storedNotes);
        res.json(storedNotes);
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;