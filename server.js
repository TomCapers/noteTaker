const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util')
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = [];

//html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

//API routes
app.get('/api/notes', (req, res) => 



readFileAsync('db/db.json', 'utf8').then(notes => {
  console.log(notes);
  return res.json([].concat(JSON.parse(notes)))
}));


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    console.log(newNote);
  
    notes.push(newNote);
    
    writeFileAsync('db/db.json',notes, 'utf8');
  });




  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));