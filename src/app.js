import { createModal, isValid } from './utils';
import './style.css';
import { Note } from './note';
import { authWithEmailAndPassword, getAuthForm } from './auth';

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#note-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', Note.renderList);
form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const note = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;

    Note.create(note).then(() => {
      input.value = '';
      input.classList = '';
      submitBtn.disabled = false;
    });
  }
}

function openModal() {
  createModal('Sing in', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector('#auth-submit');
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(token => {
      return Note.fetch(token);
    })
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error', content);
  } else {
    createModal('List notes', Note.listToHtml(content));
  }
}
