import './style.css';
import { isValid } from './utils';

const form = document.getElementById('form');
const input = form.querySelector('#note-input');
const submitBtn = form.querySelector('#submit');

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

    // Async request to server to save notes
    console.log('Notes', note);

    input.value = '';
    input.classList = '';
    submitBtn.disabled = false;
  }
}
