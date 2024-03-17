const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

const login = (event) => {
    event.preventDefault();

    const userNameValue = userNameInput.value.trim();
    if(userNameValue !== ''){
        userName = userNameValue;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
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
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

const sendMessage = (event) => {
    event.preventDefault();

    let messageInputValue = messageContentInput.value.trim();
    if(messageInputValue){
        addMessage(userName, messageInputValue);
        messageContentInput.value = '';
    } else {
        alert('Write a message before sending');
        return; 
    }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);