const express = require('express');
const fs = require('fs');
const path = require('path');


const PORT = 3001;

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





