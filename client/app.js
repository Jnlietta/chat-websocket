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

loginForm.addEventListener('submit', login);