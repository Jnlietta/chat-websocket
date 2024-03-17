const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client'))); //middleware pozwalajacy na udostepnianie plików przez server

app.get('*', (req, res) => { //endpoint dodajacy wyswietlanie aplikacji z /client pod "/"
    res.sendFile(path.join(__dirname, '/client/index.html')); // wylapuje wszystkie linki i renderuje plik /client/index.html
  });

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });

const io = socket(server);

// listener for connection
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  //listener for join
  socket.on('join', (login) => {
    login.id = socket.id;
    users.push(login);
    console.log('New client on data base is named ' + login.author);
  });

  // listener for message
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  //listener for disconnect
  socket.on('disconnect', () => { 
    const user = users.find(user => user.id === socket.id);
    const indexOfUser = users.indexOf(user);
    users.splice(indexOfUser, 1);
    console.log('Oh, socket ' + socket.id + ' has left');
    console.log('User ' + user.author + ' has been deleted from data base.');
  });
  console.log('I\'ve added a listener on message event \n');
});