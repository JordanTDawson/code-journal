var photoURL = document.querySelector('#photo-URL');
var img = document.querySelector('img');

function changeURL(event) {
  var value = event.target.value;
  img.setAttribute('src', value);
}
photoURL.addEventListener('input', changeURL);

var journalEntry = document.querySelector('#new-entry');

function handleSubmit(event) {
  if (data.editing === null) {
    event.preventDefault();
    var title = journalEntry.elements.title.value;
    var URL = journalEntry.elements.URL.value;
    var notes = journalEntry.elements.notes.value;
    var entryData = {
      entryId: data.nextEntryId++,
      title,
      URL,
      notes
    };
    data.entries.unshift(entryData);
    journalEntry.reset();
    img.setAttribute('src', 'images/placeholder-image-square.jpg');
    var renderedEntry = renderEntry(entryData);
    ul.prepend(renderedEntry);
    viewSwap('entries');
    toggleNoEntries(entryData);
  } else {
    var editEntryId = data.editing.entryId;
    var editEntryTitle = data.editing.title.value;
    var editEntryURL = data.editing.URL.value;
    var editEntryNotes = data.editing.notes.value;
    // eslint-disable-next-line no-unused-vars
    var editEntry = {
      editEntryId,
      editEntryTitle,
      editEntryURL,
      editEntryNotes
    };
  }
}

journalEntry.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  var li = document.createElement('li');
  li.setAttribute('data-entry-id', entry.entryId);

  var row = document.createElement('div');
  row.setAttribute('class', 'row entries-margin');
  li.appendChild(row);

  var $imgColumnHalf = document.createElement('div');
  $imgColumnHalf.setAttribute('class', 'column-half');
  row.appendChild($imgColumnHalf);

  var img = document.createElement('img');
  img.setAttribute('src', entry.URL);
  $imgColumnHalf.appendChild(img);

  var $textColumnHalf = document.createElement('div');
  $textColumnHalf.setAttribute('class', 'column-half');
  row.appendChild($textColumnHalf);

  var head = document.createElement('h2');
  head.setAttribute('class', 'row entries-align entries-no-margin');
  head.textContent = entry.title;
  $textColumnHalf.appendChild(head);

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa-sharp fa-solid fa-pencil');
  head.appendChild($icon);
  $icon.addEventListener('click', handleEditEntryClick);

  var $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entries-text');
  $paragraph.textContent = entry.notes;
  $textColumnHalf.appendChild($paragraph);

  return li;
}

var ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', function (event) {
  toggleNoEntries();
  viewSwap(data.view);
  for (var i = 0; i < data.entries.length; i++) {
    var dataEntered = renderEntry(data.entries[i]);
    ul.appendChild(dataEntered);
  }
});

function toggleNoEntries(entry) {
  var noEntries = document.querySelector('#no-entries');
  if (data.entries.length === 0) {
    noEntries.className = 'text-center';
  } else {
    noEntries.className = 'hidden';
  }
}

function viewSwap(viewName) {
  var entries = document.querySelector('.entries');
  var entryForm = document.querySelector('.entry-form');
  if (viewName === 'entries') {
    entries.classList.remove('hidden');
    entryForm.classList.add('hidden');
    data.view = viewName;
  }
  if (viewName === 'entry-form') {
    entryForm.classList.remove('hidden');
    entries.classList.add('hidden');
    data.view = viewName;
  }
}

var entriesAnchor = document.querySelector('#entries-nav-bar');
entriesAnchor.addEventListener('click', handleEntriesAnchorClick);
function handleEntriesAnchorClick(event) {
  viewSwap('entries');
}

var newEntryClick = document.querySelector('#new-entry-click');
newEntryClick.addEventListener('click', handleNewEntryClick);
function handleNewEntryClick(event) {
  viewSwap('entry-form');
}

function handleEditEntryClick(event) {
  viewSwap('entry-form');
  var clickedLi = event.target.closest('li');
  var dataEntryId = clickedLi.getAttribute('data-entry-id');
  var dataNumber = +dataEntryId;
  for (var i = 0; i < data.entries.length; i++) {
    if (dataNumber === data.entries[i].entryId) {
      data.editing = data.entries[i];
      var headNewEntry = document.querySelector('h1');
      headNewEntry.textContent = 'Edit Entry';
      var titleNewEntry = document.querySelector('#title');
      titleNewEntry.setAttribute('value', data.editing.title);
      var URLNewEntry = document.querySelector('#photo-URL');
      URLNewEntry.setAttribute('value', data.editing.URL);
      var imgPlaceholder = document.querySelector('img');
      imgPlaceholder.setAttribute('src', data.editing.URL);
      var notesNewEntry = document.querySelector('#notes');
      notesNewEntry.textContent = data.editing.notes;
    }
  }
}
