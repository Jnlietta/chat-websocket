const express = require('express');
const path = require('path');

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname, '/client'))); //middleware pozwalajacy na udostepnianie plików przez server

app.get('*', (req, res) => { //endpoint dodajacy wyswietlanie aplikacji z /client pod "/"
    res.sendFile(path.join(__dirname, '/client/index.html')); // wylapuje wszystkie linki i renderuje plik /client/index.html
  });

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });