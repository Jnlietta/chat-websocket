const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];

app.use(express.static(path.join(__dirname, '/client'))); //middleware pozwalajacy na udostepnianie plików przez server

app.get('*', (req, res) => { //endpoint dodajacy wyswietlanie aplikacji z /client pod "/"
    res.sendFile(path.join(__dirname, '/client/index.html')); // wylapuje wszystkie linki i renderuje plik /client/index.html
  });

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', () => { console.log('Oh, I\'ve got something from ' + socket.id) });
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log('I\'ve added a listener on message event \n');
});