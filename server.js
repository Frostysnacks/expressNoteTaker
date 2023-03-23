const express = require('express');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//route to notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//route to read the db file and return saved notes as json
app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);
//route for landing page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Get a new note and add it to the body and saves it to the db.json file

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));


    
    newNote.id =  Math.floor(Math.random() * 1000);
    //push updated note to the notes history in db.json
    noteList.push(newNote);

    //write the new data to db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})

//delete note according to their id.
app.delete('/api/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();

    //filter all notes that don't have a matching id and save them as a new array
    //the matching array will be deleted
    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    //write the new data to db.json and display the updated note
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
});


app.listen(PORT, () => 
    console.log(`App is listening on port: ${PORT}`)
);





