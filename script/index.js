"use strict";

/////////////////////////////////////////////////////Global Variables/////////////////////////////////////////////////////

let history = [];
let input = [];
let cursor = true;
let arrowCounter = 0;
let downArrowCounter = 0;
let lockUpArrow = false;
let lockDownArrow = false;
let marginState = false;
let windowMargin = 250;

//Replace with String
const command = "command";
const user = "user";
const lineBreak = "lineBreak";
const block = "block";
const inline = "inline";
const commandWithSpace = "commandWithSpace";

/////////////////////////////////////////////////////Data/////////////////////////////////////////////////////

const txt = {
  user: "user@hendriktreuner.com",
  welcomeMsg:
    "Hello. I'm Hendrik Treuner, self-taught Front End Developer, currently living in Berlin, Germany.",
  helpMsg: "For a list of commands type: 'help'",
  errorMsg: "Error. Command doesn't exist",
  help: [
    [["'resume':"], ["List of past projects I've worked on"]],
    [
      ["'skills':"],
      ["List of programming languages and technologies I use frequently"],
    ],
    [["'socials':"], ["List of all my social accounts"]],
    [["'now':"], ["Now-Page: What I am doing currently"]],
    [["'legal':"], ["Legal Disclosure"]],
    [[""], [""]],
    [["'clear':"], ["Clear CLI"]],
    [["'exit':"], ["Exit current session and reload CLI"]],
  ],
  resume: [
    [["Personal website:"], [""]],
    [[""], ["Technologies used:"]],
    [[""], ["- JavaScript, HTML, CSS, SASS"]],
    [[""], [""]],
    [[""], ["Skills learned:"]],
    [[""], ["- Hosting a website"]],
    [[""], ["- Interacting with the Filesystem via FTP"]],
    [[""], ["- Structuring files"]],
    [[""], ["- Interacting with the DOM"]],
    [[""], ["- Using Git and GitHub"]],
    [[""], ["- Listening to Events"]],
    [[""], ["- Creating a CLI"]],
  ],
  skills: [
    [["Programming Languages:"], ["- JavaScript"]],
    [[""], ["- HTML 5"]],
    [[""], ["- CSS 3"]],
    [[""], ["- SASS"]],
    [[""], ["- Bash"]],
    [[""], [""]],
    [["Frameworks and Tools:"], ["- React"]],
    [[""], ["- Node"]],
    [[""], ["- Git"]],
    [[""], ["- GitHub"]],
    [[""], [""]],
    [["Languages:"], ["- German (Native)"]],
    [[""], ["- English (Fluent)"]],
    [[""], ["- Japanese (Basic)"]],
  ],
  socials: [
    [["Personal website:"], [""]],
    [[""], ["Technologies used:"]],
    [[""], ["- JavaScript, HTML, CSS, SASS"]],
    [[""], [""]],
    [[""], ["Skills learned:"]],
    [[""], ["- Hosting a website"]],
    [[""], ["- Interacting with the Filesystem via FTP"]],
    [[""], ["- Structuring files"]],
    [[""], ["- Interacting with the DOM"]],
    [[""], ["- Using Git and GitHub"]],
    [[""], ["- Listening to Events"]],
    [[""], ["- Creating a CLI"]],
  ],
  about: [
    [["Personal Profile:"], [""]],
    [[""], [""]],
    [["Name:"], ["Hendrik Treuner"]],
    [["Age"], ["23"]],
    [["Gender"], ["Male"]],
    [["Location"], ["Berlin, Germany"]],
    [[""], [""]],
    [["Objective"], [""]],
    [[""], [""]],
    [
      [
        "Hendrik wants to form the internet of tomorrow and therefore is investing all his major time and effort into studying Web Development and how the internet works.",
      ],
      [""],
    ],
    [[""], [""]],
    [
      [
        "To bring his skills to the next level, he is eager to find work as a web developer to show of and improving his skills as well as getting his hands dirty by contributing to real-world applications.",
      ],
      [""],
    ],
  ],
  now: [
    [["Course:"], ["Advanced JavaScript"]],
    [["Porfolio:"], ["Building applications to show of my skills"]],
    [["Language:"], ["Studying Japanese"]],
  ],
  legal: [
    [["Legal Disclosure"], [""]],
    [[""], [""]],
    [["Information in accordance with Section 5 TMG"], [""]],
    [[""], [""]],
    [["Seestraße 8 "], ["18276 Gülzow-Prüzen"]],
    [["Contact Information"], [""]],
    [["Telephone: "], ["01746088503"]],
    [["E-Mail:"], ["business@hendriktreuner.com"]],
    [["Internet address:"], ["hendriktreuner.com"]],
    [[""], [""]],
    [["Disclaimer"], [""]],
    [[""], [""]],
    [["Accountability for content"], [""]],
    [[""], [""]],
    [
      [
        "The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for our own content on these web pages. In this matter, please note that we are not obliged to monitor the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity. Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).",
      ],
      [""],
    ],
    [[""], [""]],
    [["Accountability for links"], [""]],
    [[""], [""]],
    [
      [
        "Responsibility for the content of external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective link immediately.Copyright: Our web pages and their contents are subject to German copyright law. Unless expressly permitted by law, every form of utilizing, reproducing or processing works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights. Individual reproductions of a work are only allowed for private use. The materials these pages are copyrighted and any unauthorized use may violate copyright laws          .",
      ],
      [""],
    ],
  ],
};

/////////////////////////////////////////////////////DOM/////////////////////////////////////////////////////

const win = document.querySelector(".window");
const legal = document.querySelector(".legal-disclosure");
const cli = document.querySelector(".window__body");
const inputLine = document.querySelector(".input-line");
const cursorEl = document.querySelector(".cursor");
const removables = document.getElementsByClassName("removable");

/////////////////////////////////////////////////////Functions/////////////////////////////////////////////////////

function scrollToBottom() {
  var elem = document.querySelector(".window__body");
  elem.scrollTop = elem.scrollHeight;
}

function clearInputLine() {
  inputLine.textContent = "";
  input = [];
}

function deleteCharacter(arr) {
  arr.pop();
  arr.length >= 1
    ? (inputLine.textContent = displayArray(input))
    : (inputLine.textContent = "");
}

function addCharacter(arr, obj) {
  arr.push(obj.key);
  inputLine.textContent = displayArray(arr);
}

function displayHistory() {
  if (history.length > arrowCounter) {
    inputLine.textContent = history[history.length - arrowCounter];
    lockUpArrow = false;
  } else {
    lockUpArrow = true;
    inputLine.textContent = history[0];
  }
  arrowCounter <= 0 ? (lockDownArrow = true) : (lockDownArrow = false);
}

function keyListener(e) {
  //Alphabtic Key Listener
  const alphabeticKeyListener = (keyCode) => {
    if ((keyCode >= 65 && keyCode <= 90) || keyCode == 32 || keyCode == 189) {
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
      if (latestHistory(history) != "legal") scrollToBottom();
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
    ? (cursorEl.style.marginLeft = "0")
    : (cursorEl.style.marginLeft = "-10px");
}

function setMargin(el) {
  const margin = windowMargin - el.offsetWidth;
  el.style.marginRight = `${margin}px`;
  marginState = false;
}

function parseArray(arr) {
  Object.keys(arr).map((el) => {
    renderElement(commandWithSpace, inline, arr[el][0]);
    renderElement(command, inline, arr[el][1]);
    renderElement(lineBreak, block, undefined);
  });
}

function renderElement(type = "lineBreak", style = "block", ...content) {
  //types = command, commandWithSpace, user, linebreak
  //style = block, inline
  let newEl;

  switch (type) {
    case "command":
      newEl = document.createElement("p");
      content = content.flat();
      newEl.textContent = content;
      break;
    case "commandWithSpace":
      newEl = document.createElement("p");
      newEl.textContent = content;
      marginState = true;
      break;
    case "user":
      newEl = document.createElement("p");
      newEl.style.color = "#29cd3f";
      newEl.textContent = txt.user + " ";
      break;
    case "lineBreak":
      newEl = document.createElement("br");
      style = block;
      break;
    default:
      console.log("Error: Type doesn't exist!");
  }

  switch (style) {
    case "block":
      newEl.style.display = "block";
      break;
    case "inline":
      newEl.style.display = "inline";
      break;
    default:
      console.log("Error: Style doesn't exist!");
  }

  newEl.className = "removable";
  cli.insertBefore(newEl, inputLine);
  if (marginState) setMargin(newEl);
}

function parseCommand(arr) {
  const currentCommand = latestHistory(arr).split(" ");

  renderElement(lineBreak, block, undefined);
  renderElement(lineBreak, block, undefined);

  switch (currentCommand[0]) {
    case "help":
      parseArray(txt.help);
      break;
    case "now":
      parseArray(txt.now);
      break;
    case "clear":
      clearCLI();
      break;
    case "exit":
      location.reload();
      break;
    case "resume":
      parseArray(txt.resume);
      break;
    case "skills":
      parseArray(txt.skills);
      break;
    case "socials":
      parseArray(txt.socials);
      break;
    case "about":
      parseArray(txt.about);
      break;
    case "legal":
      clearCLI();
      parseArray(txt.legal);
      break;
    default:
      renderElement(command, block, txt.errorMsg);
  }

  renderElement(lineBreak, block, undefined);
}

function cursorBlink() {
  if (cursor) {
    cursorEl.textContent = "\u200b";
    cursor = false;
  } else {
    cursorEl.textContent = "|";
    cursor = true;
  }
}

const latestHistory = (arr) => arr[arr.length - 1];
const displayArray = (arr) => arr.reduce((acc, el) => acc + el);
const trimString = (str) => str.trimStart().trimEnd();
const clearCLI = () => Array.from(removables).map((el) => el.remove());

/////////////////////////////////////////////////////Initialisation/////////////////////////////////////////////////////

renderElement(command, block, txt.welcomeMsg);
renderElement(lineBreak, block, undefined);
renderElement(command, block, txt.helpMsg);
renderElement(lineBreak, block, undefined);
renderElement(user, inline, txt.user);

setInterval(cursorBlink, 500);

//Prevent Arrow Key Scrolling
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

document.addEventListener("click", function (e) {
  if (win.contains(e.target)) {
    win.focus();
  } else {
    win.blur();
  }
});

win.addEventListener("focus", (e) => {
  e.target.addEventListener("keydown", keyListener);
});

legal.addEventListener("click", () => {
  parseCommand(["legal"]);
  renderElement(user, inline, txt.user);
});

window.addEventListener("resize", () => {
  changeMargin();
});

function changeMargin() {
  const currentWidth = document.body.scrollWidth;
  if (currentWidth <= 992) windowMargin = 100;
}

/////////////////////////////////////////////////////Draggable/////////////////////////////////////////////////////

// Make the DIV element draggable:
dragElement(document.querySelector(".window"));

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
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
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
