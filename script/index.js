'use strict';

/////////////////////////////////////////////////////Global Variables/////////////////////////////////////////////////////

let history = [];
let input = [];
let cursor = true;
let arrowCounter = 0;
let downArrowCounter = 0;
let lockUpArrow = false;
let lockDownArrow = false;
let marginState = false;

//Replace with String
const command = 'command';
const user = 'user';
const lineBreak = 'lineBreak';
const block = 'block';
const inline = 'inline';
const commandWithSpace = 'commandWithSpace';

/////////////////////////////////////////////////////HTML DOM/////////////////////////////////////////////////////

const cli = document.querySelector('.window__body');
const inputLine = document.querySelector('.input-line');
const cursorEl = document.querySelector('.cursor');
const removables = document.getElementsByClassName('removable');

/////////////////////////////////////////////////////Messages/////////////////////////////////////////////////////

const txt = {
  user: 'user@hendriktreuner.com',
  welcomeMsg:
    "Hello. I'm Hendrik Treuner, self-taught Front End Developer, currently living in Berlin, Germany.",
  helpMsg: "For a list of commands type: 'help'",
  errorMsg: "Error. Command doesn't exist",
  help: [
    [["'resume':"], ['Displays the current projects I have worked on']],
    [
      ["'skills':"],
      ['Displays all frameworks, libraries, programming languages'],
    ],
    [
      ["'socials':"],
      ['Want to get in contact with me? Here are all my social media accounts'],
    ],
    [["'about':"], ['If you want to know more about me']],
    // "'skills': Displays all frameworks, libraries, programming languages I am comfortable working with",
    // "'socials': Want to get in contact with me? Here are all my social media accounts",
    // "'blog': My self-made blog. I mostly talk about my life and job",
    // "'about': If you want to know more about me",
  ],
  resume: ['Personal website: The website you are currently on.'],
};

/////////////////////////////////////////////////////Functions/////////////////////////////////////////////////////

function clearInputLine() {
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
  inputLine.textContent = displayArray(arr);
}

function displayHistory() {
  if (history.length > arrowCounter) {
    inputLine.textContent = history[history.length - arrowCounter];
    lockUpArrow = false;
    console.log(arrowCounter);
  } else {
    lockUpArrow = true;
    inputLine.textContent = history[0];
    console.log(arrowCounter);
  }
  arrowCounter <= 0 ? (lockDownArrow = true) : (lockDownArrow = false);
}

function keyListener(e) {
  //Alphabtic Key Listener
  const alphabeticKeyListener = (keyCode) => {
    switch (true) {
      case keyCode >= 65:
      case keyCode <= 90:
      case keyCode == 32:
      case keyCode == 189:
        addCharacter(input, e);
    }
  };

  //Main Key Listener
  switch (e.keyCode) {
    case 13:
      arrowCounter = 0;
      history.push(trimString(inputLine.textContent));
      clearInputLine();
      renderElement(command, inline, latestHistory(history));
      parseCommand(history);
      renderElement(user, inline, txt.user);
      break;
    case 8:
      deleteCharacter(input);
      break;
    case 38:
      clearInputLine();
      if (!lockUpArrow) {
        ++arrowCounter;
      }
      displayHistory(history);
      break;
    case 40:
      clearInputLine();
      if (!lockDownArrow) {
        --arrowCounter;
      }
      displayHistory(history);
      break;
    default:
      alphabeticKeyListener(e.keyCode);
  }

  //Cursor Formatting
  input.length < 1
    ? (cursorEl.style.marginLeft = '0')
    : (cursorEl.style.marginLeft = '-10px');
}

function setMargin(el) {
  const margin = 150 - el.offsetWidth;
  console.log(margin);
  el.style.marginRight = `${margin}px`;
  marginState = false;
}

function renderElement(type = 'lineBreak', style = 'block', ...content) {
  //types = command, user, linebreak
  //style = block, inline
  let newEl;

  switch (type) {
    case 'command':
      newEl = document.createElement('p');
      content = content.flat();
      newEl.textContent = content;
      break;
    case 'commandWithSpace':
      newEl = document.createElement('p');
      newEl.textContent = content;
      marginState = true;
      break;
    case 'user':
      newEl = document.createElement('p');
      newEl.style.color = '#29cd3f';
      newEl.textContent = txt.user + ' ';
      break;
    case 'lineBreak':
      newEl = document.createElement('br');
      style = block;
      break;
    default:
      console.log("Error: Type doesn't exist!");
  }

  switch (style) {
    case 'block':
      newEl.style.display = 'block';
      break;
    case 'inline':
      newEl.style.display = 'inline';
      break;
    default:
      console.log("Error: Style doesn't exist!");
  }

  newEl.className = 'removable';
  cli.insertBefore(newEl, inputLine);
  if (marginState) setMargin(newEl);
}

function parseCommand(arr) {
  const currentCommand = latestHistory(arr).split(' ');
  console.log(currentCommand);

  renderElement(lineBreak, block, undefined);
  renderElement(lineBreak, block, undefined);

  switch (currentCommand[0]) {
    case 'help':
      Object.keys(txt.help).map((el) => {
        renderElement(commandWithSpace, inline, txt.help[el][0]);
        renderElement(command, inline, txt.help[el][1]);
        renderElement();
      });
      break;
    case 'clear':
      clearCLI();
      break;
    case 'exit':
      location.reload();
      break;
    case 'skills':
      renderElement(command, block, txt.skills);
      break;
    case 'socials':
      renderElement(command, block, txt.socials);
      break;
    case 'about':
      renderElement(command, block, txt.socials);
      break;
    default:
      renderElement(command, block, txt.errorMsg);
  }

  renderElement(lineBreak, block, undefined);
}

function cursorBlink() {
  if (cursor) {
    cursorEl.textContent = '\u200b';
    cursor = false;
  } else {
    cursorEl.textContent = '|';
    cursor = true;
  }
}

const latestHistory = (arr) => arr[arr.length - 1];
const displayArray = (arr) => arr.reduce((acc, el) => acc + el);
const trimString = (str) => str.trimStart().trimEnd();
const clearCLI = () => Array.from(removables).map((el) => el.remove());

/////////////////////////////////////////////////////Initialisation/////////////////////////////////////////////////////

renderElement(command, inline, txt.welcomeMsg);
renderElement(command, block, txt.helpMsg);
renderElement(lineBreak, block, undefined);
renderElement(user, inline, txt.user);

setInterval(cursorBlink, 500);

//Prevent Arrow Key Scrolling
window.addEventListener(
  'keydown',
  function (e) {
    if (
      ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener('keydown', keyListener);

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
