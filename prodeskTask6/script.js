let boards = {
  "Platform Launch": {
    todo: [""],
    doing: [""],
    done: [""]
  },
  "Marketing Plan": {
    todo: [""],
    doing: [],
    done: []
  },
  "Roadmap": {
    todo: [""],
    doing: [],
    done: []
  }
};

let currentBoard = "Platform Launch";

// Local Storage
function saveToLocalStorage() {
  localStorage.setItem("kanbanBoards", JSON.stringify(boards));
  localStorage.setItem("kanbanCurrentBoard", currentBoard);
}

function loadFromLocalStorage() {
  const savedBoards = localStorage.getItem("kanbanBoards");
  const savedCurrent = localStorage.getItem("kanbanCurrentBoard");
  if (savedBoards) boards = JSON.parse(savedBoards);
  if (savedCurrent) currentBoard = savedCurrent;
}

function renderBoard() {
  document.getElementById("boardTitle").textContent = currentBoard;

  const todo = document.getElementById("todoTasks");
  const doing = document.getElementById("doingTasks");
  const done = document.getElementById("doneTasks");

  [todo, doing, done].forEach(col => col.innerHTML = "");

  boards[currentBoard].todo.forEach(task => {
    todo.appendChild(createTaskElement(task, "todo"));
  });
  boards[currentBoard].doing.forEach(task => {
    doing.appendChild(createTaskElement(task, "doing"));
  });
  boards[currentBoard].done.forEach(task => {
    done.appendChild(createTaskElement(task, "done"));
  });

  ["todo", "doing", "done"].forEach(col => {
    document.getElementById(`${col}Input`).innerHTML = "";
  });

  saveToLocalStorage();
}

function createTaskElement(task, status) {
  const div = document.createElement("div");
  div.className = "task";
  div.setAttribute("draggable", "true");
  div.setAttribute("data-task", task);
  div.setAttribute("data-status", status);

  div.innerHTML = `<p>${task}</p>`;
  div.addEventListener("dragstart", dragStart);
  return div;
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", JSON.stringify({
    task: e.target.getAttribute("data-task"),
    from: e.target.getAttribute("data-status")
  }));
}

function dragOver(e) {
  e.preventDefault();
}

function dropTask(e, toColumn) {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  const { task, from } = data;

  const index = boards[currentBoard][from].indexOf(task);
  if (index !== -1) {
    boards[currentBoard][from].splice(index, 1);
    boards[currentBoard][toColumn].push(task);
    renderBoard();
  }
}

function showInput(column) {
  document.querySelectorAll(".task-input").forEach(div => div.innerHTML = "");

  const inputDiv = document.getElementById(`${column}Input`);
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter task title...";
  input.className = "task-text";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add";
  addBtn.className = "submit-btn";
  addBtn.onclick = () => {
    const value = input.value.trim();
    if (value) {
      boards[currentBoard][column].push(value);
      renderBoard();
    }
  };

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "cancel-btn";
  cancelBtn.onclick = () => inputDiv.innerHTML = "";

  inputDiv.appendChild(input);
  inputDiv.appendChild(addBtn);
  inputDiv.appendChild(cancelBtn);
}

function renderSidebarBoards() {
  const boardList = document.getElementById("boardList");
  boardList.innerHTML = "";

  for (const name in boards) {
    const li = document.createElement("li");
    li.className = "board" + (name === currentBoard ? " active" : "");

    const label = document.createElement("span");
    label.textContent = name;
    label.style.cursor = "pointer";
    label.onclick = () => switchBoard(name);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.className = "delete-board";
    delBtn.title = "Delete board";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Delete board "${name}"?`)) {
        delete boards[name];
        currentBoard = Object.keys(boards)[0] || "";
        renderSidebarBoards();
        renderBoard();
        saveToLocalStorage();
      }
    };

    li.appendChild(label);
    li.appendChild(delBtn);
    boardList.appendChild(li);
  }
}


function switchBoard(boardName, event) {
  currentBoard = boardName;
  renderSidebarBoards();
  renderBoard();
}


function toggleMode() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  localStorage.setItem("kanbanTheme", document.body.classList.contains("light") ? "light" : "dark");
}
function showBoardInput() {
  document.getElementById("boardInputBox").style.display = "block";
  document.getElementById("newBoardName").focus();
}

function cancelBoard() {
  document.getElementById("boardInputBox").style.display = "none";
  document.getElementById("newBoardName").value = "";
}

function createBoard() {
  const name = document.getElementById("newBoardName").value.trim();
  if (name && !boards[name]) {
    boards[name] = { todo: [], doing: [], done: [] };
    currentBoard = name;
    renderSidebarBoards();
    renderBoard();
    saveToLocalStorage();
  }
  cancelBoard();
}
function exportBoards() {
  const blob = new Blob([JSON.stringify(boards)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kanban-data.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("importFile").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (typeof imported === "object") {
        boards = imported;
        currentBoard = Object.keys(boards)[0];
        saveToLocalStorage();
        renderSidebarBoards();
        renderBoard();
      } else {
        alert("Invalid file format.");
      }
    } catch {
      alert("Error parsing file.");
    }
  };
  reader.readAsText(file);
});

// On load
window.onload = () => {
  loadFromLocalStorage();
  renderSidebarBoards();
  renderBoard();

  const savedTheme = localStorage.getItem("kanbanTheme");
  if (savedTheme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
  }
};
