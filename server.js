const express = require('express');
const path = require('path');
const fs = require('fs');



const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];

//html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

//API routes
app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    newNote.routeName = newNote.notes;
    console.log(newNote);
  
    notes.push(newNote);
    res.json(newNote);
  });

//   function saveNote(){
//     
//     fs.writeFile('./db/db.json', , 'utf-8');


  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));