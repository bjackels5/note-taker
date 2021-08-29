const fs = require("fs");
const path = require("path");

const createNewNote = (body, notes) => {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes, null, 2)
    );

    return note;
}

const isString = testing => Boolean(testing && typeof testing === 'string');

const validateNote = note => {

    return Boolean(isString(note.title) && isString(note.text));
}

module.exports = { createNewNote, validateNote };