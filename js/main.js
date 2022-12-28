var photoURL = document.querySelector('#photo-URL');
var img = document.querySelector('img');
function changeURL(event) {
  var value = event.target.value;
  img.setAttribute('src', value);
}
photoURL.addEventListener('input', changeURL);
