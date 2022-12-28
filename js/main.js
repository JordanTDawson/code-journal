var photoURL = document.querySelector('#photo-URL');
var img = document.querySelector('img');

function changeURL(event) {
  var value = event.target.value;
  img.setAttribute('src', value);
}
photoURL.addEventListener('input', changeURL);

var journalEntry = document.querySelector('#new-entry');

function handleSubmit(event) {
  event.preventDefault();
  var title = journalEntry.elements.title.value;
  var URL = journalEntry.elements.URL.value;
  var notes = journalEntry.elements.notes.value;
  var entryData = {
    entryID: data.nextEntryId++,
    title,
    URL,
    notes
  };
  data.entries.push(entryData);
  journalEntry.reset();
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

journalEntry.addEventListener('submit', handleSubmit);
