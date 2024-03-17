const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();
let userName = '';

const login = (event) => {
    event.preventDefault();

    const userNameValue = userNameInput.value.trim();
    if(userNameValue !== ''){
        userName = userNameValue;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', { author: userName });
    } else {
        alert('User name can not be empty!');
        return; 
    }
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    if(author === 'Chat Bot') message.classList.add('message--chat');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
};

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('newUser', ({ author, content }) => addMessage(author, content));
