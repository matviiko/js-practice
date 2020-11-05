export class Note {
  static create(note) {
    return fetch('https://js-note-44573.firebaseio.com/notes.json', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        note.id = response.name;
        return note;
      })
      .then(addToLocalStorage)
      .then(Note.renderList);
  }

  static renderList() {
    const notes = getNotesFromLocalStorage();

    const html = notes.length
      ? notes.map(toCard).join('')
      : `<div class="mui--text-headline">You dont write anything</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }
}

function toCard(note) {
  return `
          <div class="mui--text-black-54">
            ${new Date(note.date).toLocaleDateString()}
            ${new Date(note.date).toLocaleTimeString()}
          </div>
          <div>${note.text}</div>
          <br>
  `;
}

function addToLocalStorage(note) {
  const all = getNotesFromLocalStorage();
  all.push(note);

  localStorage.setItem('note', JSON.stringify(all));
}

function getNotesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('note') || '[]');
}
