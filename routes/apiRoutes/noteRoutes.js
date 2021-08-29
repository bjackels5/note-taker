const router = require('express').Router();

const { validateNote } = require('../../lib/notes');

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
    req.body.id = storedNotes.length.toString();
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        const note = createNewNote(req.body, storedNotes);
        res.json(note);
    }
});

module.exports = router;