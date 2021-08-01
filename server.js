const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util')





const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let notes = [];

//html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

//API routes
app.get('/api/notes', (req, res) => 

fs.readFile('db/db.json', 'utf8', (error, data) =>


      {
        error ? console.log(error) : notes = JSON.parse(data);
        return res.json(notes)
      }


));


app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    console.log(newNote);

    fs.readFile('db/db.json', 'utf8', (error, data) =>
      {
        error ? console.log(error) : notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
          err? console.log(err) : res.json(notes)
    )});
     
    });

    app.delete('/api/notes/:id', (req, res) => {
      const dnote = req.params.id

      fs.readFile('db/db.json', 'utf8', (error, data) =>
      {
        error ? console.log(error) : notes = JSON.parse(data);
        notes.splice(dnote,1);
        fs.writeFile('db/db.json', JSON.stringify(notes), (err) =>
          err? console.log(err) : res.json(notes)
    )})
    });




  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));