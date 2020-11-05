import { isValid } from './utils';
import './style.css';
import { Note } from './note';

const form = document.getElementById('form');
const input = form.querySelector('#note-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', Note.renderList);
form.addEventListener('submit', submitFormHandler);
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
