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
  socket.on('join', (loggedUserData) => {
    //add to object loggedUserData value id
    loggedUserData.id = socket.id;

    //add data of new user to array users
    users.push(loggedUserData);
    console.log('New client on data base is named ' + loggedUserData.author);

    //create newUser object
    const newUser = {};
    newUser.author = 'Chat Bot';
    newUser.content = loggedUserData.author + ' has joined the conversation!';

    //emiter for other users that there is newUser
    socket.broadcast.emit('newUser', newUser);
  });

  // listener for message
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);

    //add data of message to messages array
    messages.push(message);

    //emiter for other users to got a message
    socket.broadcast.emit('message', message);
  });

  //listener for disconnect
  socket.on('disconnect', () => { 
    //find user that left chat in array users and remove it from array
    const user = users.find(user => user.id === socket.id);
    const indexOfUser = users.indexOf(user);
    users.splice(indexOfUser, 1);

    console.log('Oh, socket ' + socket.id + ' has left');
    console.log('User ' + user.author + ' has been deleted from data base.');

    //create object userLeft
    const userLeft = {};
    userLeft.author = 'Chat Bot';
    userLeft.content = user.author + ' has left the conversation... :(.';

    //emiter for other users that user has left
    socket.broadcast.emit('userLeft', userLeft);
  });

  console.log('I\'ve added a listener on message event \n');
});