const router = require('express').Router();

const ns = require('../../lib/notes');

const storedNotes = require('../../db/db.json');

router.get('/notes', (req, res) => {
   res.json(storedNotes);
});

router.post('/notes', (req, res) => {
    // req.body is where our incoming content will be
    // since we allow notes to be deleted, the length of the array +1 is not guaranteed
    // to be a unique id. Use getMaxId to get the current max id, add 1 to id to guarantee a 
    // unique id
    req.body.id = (ns.getMaxId(storedNotes) + 1).toString();
    if (!ns.validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        const note = ns.createNewNote(req.body, storedNotes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const idMatches = (note) => note.id === req.params.id;
    const indexToRemove = storedNotes.findIndex(idMatches);

    if (indexToRemove > -1) {
        storedNotes.splice(indexToRemove, 1);
        ns.saveNotesToDB(storedNotes);
        res.json(storedNotes);
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;