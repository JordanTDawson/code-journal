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
  data.entries.unshift(entryData);
  journalEntry.reset();
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
}

journalEntry.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  var li = document.createElement('li');

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
  head.setAttribute('class', 'entries-no-margin');
  head.textContent = entry.title;
  $textColumnHalf.appendChild(head);

  var $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entries-text');
  $paragraph.textContent = entry.notes;
  $textColumnHalf.appendChild($paragraph);

  return li;
}

var ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var dataEntered = renderEntry(data.entries[i]);
    ul.appendChild(dataEntered);
  }
});
