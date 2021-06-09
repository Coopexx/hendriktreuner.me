'use strict';

/////////////////////////////////////////////////////Global Variables/////////////////////////////////////////////////////

let history = [];
let input = [];
let cursor = true;

/////////////////////////////////////////////////////HTML DOM/////////////////////////////////////////////////////

const cli = document.querySelector('.window__body');
const inputLine = document.querySelector('.input-line');
const cursorELement = document.querySelector('.cursor');

/////////////////////////////////////////////////////Messages/////////////////////////////////////////////////////

const currentuser = 'user@hendriktreuner.com';

const welcomeMsg =
  "Hello. I'm Hendrik Treuner,self taught Front End Developer currently living in Berlin, Germany.";

const helpMsg = "For a list of commands type: 'help'";

const errorMsg = "Error. Command doesn't exist";

/////////////////////////////////////////////////////Functions/////////////////////////////////////////////////////

function clearCurrentLine() {
  inputLine.textContent = '';
  input = [];
}

function deleteCharacter(arr) {
  arr.pop();
  arr.length >= 1
    ? (inputLine.textContent = displayArray(input))
    : (inputLine.textContent = '');
}

function addCharacter(arr, obj) {
  arr.push(obj.key);
  inputLine.textContent = currentuser + ' ' + displayArray(arr);
}

function addLine(str) {
  const p = document.createElement('p');
  p.textContent = str;
  cli.insertBefore(p, inputLine);
}

//Need to be two inline paragraphs. Second paragraph needs to be listening to keyboard
function windowEventHandler(e) {
  if (e.key === 'Enter') {
    history.push(formatInput(inputLine.textContent));
    addLine(latestHistory(history));
    parseCommand(history);
    clearCurrentLine();
  } else if (e.key === 'Backspace') {
    deleteCharacter(input);
  } else if (
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    e.keyCode === 32 ||
    e.keyCode === 189
  ) {
    addCharacter(input, e);
  }
}

function renderUser(user) {
  const userElement = document.createElement('p');
  userElement.style.display = 'inline';
  userElement.style.color = '#29cd3f';
  userElement.textContent = user + ' ';
  cli.insertBefore(userElement, inputLine);
}

function lineBreak() {
  const br = document.createElement('br');
  cli.insertBefore(br, inputLine);
}

function createElements(str) {
  str.map((el) => {
    const item = document.createElement('p');
    item.style.display = 'inline';
    item.textContent = el + ' ';
    cli.insertBefore(item, inputLine);
  });
}

function displayString(user, ...str) {
  user = formatInput(user);

  if (user != '') {
    renderUser(user);
    createElements(str);
  } else {
    lineBreak();
    createElements(str);
    lineBreak();
  }

  lineBreak();
}

function parseCommand(arr) {
  const currentCommand = latestHistory(arr).split(' ');
  console.log(currentCommand);

  if (currentCommand[0] === 'help') {
    displayString('You typed in help');
  } else {
    displayString('', errorMsg);
  }
}

function cursorBlink() {
  if (cursor) {
    cursorELement.textContent = '\u200b';
    cursor = false;
  } else {
    cursorELement.textContent = '|';
    cursor = true;
  }
}

const latestHistory = (arr) => arr[arr.length - 1];
const displayArray = (arr) => arr.reduce((acc, el) => acc + el);
const formatInput = (str) => str.trimStart().trimEnd();

/////////////////////////////////////////////////////Initialisation/////////////////////////////////////////////////////

displayString('', welcomeMsg);
displayString('', helpMsg);

setInterval(cursorBlink, 500);

document.addEventListener('keydown', windowEventHandler);

/////////////////////////////////////////////////////Draggable/////////////////////////////////////////////////////

// Make the DIV element draggable:
dragElement(document.querySelector('.window'));

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + 'header')) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
