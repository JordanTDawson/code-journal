var photoURL = document.querySelector('#photo-URL');
var img = document.querySelector('img');
var deleteButton = document.querySelector('#delete-button');
var buttonColumn = document.querySelector('#button-column');

function changeURL(event) {
  var value = event.target.value;
  img.setAttribute('src', value);
}
photoURL.addEventListener('input', changeURL);

var journalEntry = document.querySelector('#new-entry');

function handleSubmit(event) {
  event.preventDefault();
  if (data.editing === null) {
    var title = journalEntry.elements.title.value;
    var URL = journalEntry.elements.URL.value;
    var notes = journalEntry.elements.notes.value;
    var entryId = data.nextEntryId++;
    var entryData = {
      entryId,
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
    viewSwap('entries');
    var editEntry = {
      entryId: data.editing.entryId,
      title: journalEntry.elements.title.value,
      URL: journalEntry.elements.URL.value,
      notes: journalEntry.elements.notes.value
    };
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === editEntry.entryId) {
        data.entries[i] = editEntry;
        var edittedEntry = renderEntry(data.entries[i]);
        var allLi = document.querySelectorAll('li');
        for (var index = 0; index < allLi.length; index++) {
          var liValues = allLi[index].getAttribute('data-entry-id');
          if (+liValues === editEntry.entryId) {
            allLi[index].replaceWith(edittedEntry);
          }
        }
      }
    }
  }
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  journalEntry.reset();
  data.editing = null;
  var replaceNewEntry = document.querySelector('h1');
  replaceNewEntry.textContent = 'New Entry';
  deleteButton.setAttribute('class', 'delete-button   hidden');
  buttonColumn.setAttribute('class', 'column-full save-margin space-between text-right');
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
  data.editing = null;
  var replaceNewEntry = document.querySelector('h1');
  replaceNewEntry.textContent = 'New Entry';
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  deleteButton.setAttribute('class', 'delete-button   hidden');
  buttonColumn.setAttribute('class', 'column-full save-margin space-between text-right');
  journalEntry.reset();
}

var newEntryClick = document.querySelector('#new-entry-click');
newEntryClick.addEventListener('click', handleNewEntryClick);
function handleNewEntryClick(event) {
  data.editing = null;
  var replaceNewEntry = document.querySelector('h1');
  replaceNewEntry.textContent = 'New Entry';
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  deleteButton.setAttribute('class', 'delete-button   hidden');
  buttonColumn.setAttribute('class', 'column-full save-margin space-between text-right');
  journalEntry.reset();
  viewSwap('entry-form');
}

function handleEditEntryClick(event) {
  viewSwap('entry-form');
  deleteButton.classList.remove('hidden');
  buttonColumn.classList.remove('text-right');
  var clickedLi = event.target.closest('li');
  var dataEntryId = clickedLi.getAttribute('data-entry-id');
  var dataNumber = +dataEntryId;
  for (var i = 0; i < data.entries.length; i++) {
    if (dataNumber === data.entries[i].entryId) {
      data.editing = data.entries[i];
      var headNewEntry = document.querySelector('h1');
      headNewEntry.textContent = 'Edit Entry';
      document.querySelector('#title').value = data.editing.title;
      document.querySelector('#photo-URL').value = data.editing.URL;
      var imgPlaceholder = document.querySelector('img');
      imgPlaceholder.setAttribute('src', data.editing.URL);
      document.querySelector('#notes').value = data.editing.notes;
    }
  }
}

var cancelButton = document.querySelector('#cancel');
var modalContainer = document.querySelector('#closed-container');
var confirmButton = document.querySelector('#confirm');

deleteButton.addEventListener('click', function () {
  modalContainer.classList.add('show');
});

cancelButton.addEventListener('click', function () {
  modalContainer.classList.remove('show');
});

function handleModalConfirmClick(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
      var allLi = document.querySelectorAll('li');
      for (var index = 0; index < allLi.length; index++) {
        var liValues = allLi[index].getAttribute('data-entry-id');
        if (+liValues === data.editing.entryId) {
          ul.removeChild(allLi[index]);
        }
      }
    }
  }
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  journalEntry.reset();
  data.editing = null;
  var replaceNewEntry = document.querySelector('h1');
  replaceNewEntry.textContent = 'New Entry';
  deleteButton.setAttribute('class', 'delete-button   hidden');
  buttonColumn.setAttribute('class', 'column-full save-margin space-between text-right');
  modalContainer.classList.remove('show');
  toggleNoEntries(data.entries);
  viewSwap('entries');
}

confirmButton.addEventListener('click', handleModalConfirmClick);
