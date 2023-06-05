/** input.note-title[type="text"]
 * @type {HTMLInputElement} */
let noteTitle;

/** textarea.note-textarea
 * @type {HTMLTextAreaElement} */
let noteText;

/** .icons i.save-note[role="button"]
 * @type {HTMLElement} */
let saveNoteBtn;

/** .icons i.new-note[role="button"]
 * @type {HTMLElement} */
let newNoteBtn;

/** ul.note-list.list-group
 * @type {HTMLUListElement[]} */
let noteList;

/**
 * Contains all the data of a note, saved in db.json
 * @typedef {Object} Note
 * @property {String} title - note title
 * @property {String} text - content of the note
 * @property {String} [note_id] - unique id, only undefined if this is the current active note and has never been saved
*/

// This is the same script used in index.html, and the following elements only need to be defined for notes.html
if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  /** How come this is querySelectorAll? Is there another .note-list?
   * See at the bottom of function createLi that each list element is appended to `noteList[0]`
   * @see createLi
  */
  noteList = document.querySelectorAll('.note-list');  
}

/**
 * Show an element
 * @param {HTMLElement} elem - Element to show
 */
const show = (elem) => {
  elem.style.display = 'inline';
};

/**
 * Hide an element
 * @param {HTMLElement} elem - Element to hide
 */
const hide = (elem) => {
  elem.style.display = 'none';
};

/**
 * activeNote is used to keep track of the data of the note in the textarea
 * @type {Note}
 */
let activeNote = {};

/**
 * - GET fetch request, URL: '/api/notes'
 * - Reads contents of db.json. See ./routes/notes.js
 */
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

/**
 * - POST fetch request, URL: '/api/notes'.
 * - Saves new note to db.json.  See ./routes/notes.js.
 * - Used by function handleNoteSave, which is called upon clicking the saveNoteButton
 * @param {Note} note - new note to save
 * @see handleNoteSave
 * @see saveNoteBtn
 */
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

/**
 * - DELETE fetch request, URL: `/api/notes/${note_id}`
 * - Deletes from db.json the note with the given id.  See ./routes/notes.js
 * - Used by function handleNoteDelete, which is called upon clicking the delete button for a given note in the note list
 * @param {String} note_id - The id of the note to be deleted
 * @see handleNoteDelete
 * @see noteList
 */
const deleteNote = (note_id) =>
  fetch(`/api/notes/${note_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

/**
 * Sets values and attributes of noteTitle and noteText
 */
const renderActiveNote = () => {
  hide(saveNoteBtn);

  // if the active note is one that was previously saved
  if (activeNote.note_id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else { // else, render a blank note for editing
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

/**
 * Called upon clicking the save button
 */
const handleNoteSave = () => {
  /** @type {Note} */
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

/**
 * Called upon clicking a delete button
 * @param {MouseEvent} e - Click event
 */
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  // (Edited a little for clarity)
  const del = e.target;
  /** @type {Note} */
  const note = JSON.parse(del.parentElement.getAttribute('data-note'));
  const noteId = note.note_id;

  // if the note to delete is also displayed as the active note, reset the active note to blank
  if (activeNote.note_id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    // after deleting the note, re-render elements on the page
    getAndRenderNotes();
    renderActiveNote();
  });
};

/**
 * Sets the activeNote and displays it
 * @param {Event} e 
 */
const handleNoteView = (e) => {
  e.preventDefault();
  /** @type {Note} */
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

/**
 * Sets the activeNote to and empty object and allows the user to enter a new note. Called upon clicking New Note button
 * @param {Event} e - Click event
 */
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

/**
 * if there is no title, or no text, hide the save button
 */
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

/**
 * Render the list of note titles.  Called in function getAndRenderNotes = () => getNotes().then(renderNoteList);
 * @param {String} notes - The contents of db.json
 */
const renderNoteList = async (notes) => {
  /** @type {Note[]} */
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  /**
   * Returns HTML element with or without a delete button
   * @param {String} text - Note title
   * @param {Boolean} [delBtn=true] - Whether to create delete button
   * @returns {HTMLLIElement}
   */
  const createLi = (text, delBtn = true) => {
    /** @type {HTMLLIElement} */
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    /** @type {HTMLSpanElement} */
    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      /**
       * The delete button for each note in noteList. 
       * .list-container i 
       * @type {HTMLElement}
       */
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }


  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);  // li.setAttribute('data-note',JSON.stringify(note))

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

/**
 * Gets notes from the db and renders them to the sidebar
 */
const getAndRenderNotes = () => getNotes().then(renderNoteList);


/* ***** Here is where functions are actually executed ***** */

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
