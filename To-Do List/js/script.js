var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) :  {
  todo: [],
  completed: []
};

var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{fill:#c0cecb}</style><path class="fill" d="M16.1 3.6h-1.9v-.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9 1 7.8 2 7.8 3.3v.2H5.9c-1.3 0-2.3 1-2.3 2.3v1.3c0 .5.4.9.9 1v10.5c0 1.3 1 2.3 2.3 2.3h8.5c1.3 0 2.3-1 2.3-2.3V8.2c.5-.1.9-.5.9-1V5.9c-.1-1.3-1.1-2.3-2.4-2.3zm-7-.3c0-.6.5-1.1 1.1-1.1h1.7c.6 0 1.1.5 1.1 1.1v.2H9.1v-.2zm7.2 15.4c0 .6-.5 1.1-1.1 1.1H6.7c-.6 0-1.1-.5-1.1-1.1V8.2h10.6l.1 10.5zM17.2 7H4.8V5.9c0-.6.5-1.1 1.1-1.1h10.2c.6 0 1.1.5 1.1 1.1V7z"/><path class="fill" d="M11 18c-.4 0-.6-.3-.6-.6v-6.8c0-.4.3-.6.6-.6s.6.3.6.6v6.8c0 .3-.2.6-.6.6zM8 18c-.4 0-.6-.3-.6-.6v-6.8c0-.4.3-.6.6-.6.4 0 .6.3.6.6v6.8c.1.3-.2.6-.6.6zM14 18c-.4 0-.6-.3-.6-.6v-6.8c0-.4.3-.6.6-.6.4 0 .6.3.6.6v6.8c0 .3-.3.6-.6.6z"/></svg>'
var completeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path class="circle" d="M0 0h22v22H0z"/><path class="check" d="M9.7 14.4c-.2 0-.4-.1-.5-.2l-2.7-2.7c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.1 2.1 4.8-4.8c.3-.3.8-.3 1.1 0s.3.8 0 1.1l-5.3 5.3c-.2.2-.4.3-.6.3z"/></svg>'

renderList();

document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;

  if (value) {
    addItem(value);
  }
  // Resets the input's innerText value for the next item
  document.getElementById('item').value = '';

  updateList();
});

document.getElementById('item').addEventListener('keydown', function(event) {
  var value = this.value;

  if (event.code === 'Enter' && value) {
    onEnter(value);
  }
});

function onEnter(value) {
  addItem(value);

  data.todo.push(value);
  // Resets the input's innerText value for the next item
  document.getElementById('item').value = '';

  updateList();
}

function renderList() {
  if (!data.todo.length && !data.completed.length) return;
  // Generates the HTML for saved 'todo' items
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItem(value);
  }
  // Generates the HTML for saved 'completed' items
  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItem(value, true);
  }
}

function updateList() {
  // Stores array items locally in JSON format
  localStorage.setItem('todoList', JSON.stringify(data));
}

function addItem(text, completed) {
  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;
  complete.addEventListener('click', completeItem);

  item.appendChild(buttons);
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  list.appendChild(item);
  // Inserts newest item at the top of the list
  list.insertBefore(item, list.childNodes[0]);
}

function removeItem(event) {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  // Removes items from either array when the 'remove' button is clicked
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }

  updateList();
  // Removes a particular <li> from the list
  parent.removeChild(item);
}

function completeItem(event) {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  // Sorts item entries between arrays
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }

  updateList();

  var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
  // Removes a particular <li> from the list
  parent.removeChild(item);
  // Inserts newest item at the top of the list
  target.insertBefore(item, target.childNodes[0]);
}
