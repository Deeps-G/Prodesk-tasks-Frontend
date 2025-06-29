let boards = {
  "Platform Launch": {
    todo: ["Build UI", "Test flows", "Javascript"],
    doing: ["Authentication"],
    done: ["Wireframe"]
  },
  "Marketing Plan": {
    todo: ["Market research"],
    doing: [],
    done: []
  },
  "Roadmap": {
    todo: ["Plan Q4"],
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

function switchBoard(boardName, event) {
  currentBoard = boardName;
  document.querySelectorAll(".board").forEach(el => el.classList.remove("active"));
  event.target.classList.add("active");
  renderBoard();
}

function toggleMode() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  localStorage.setItem("kanbanTheme", document.body.classList.contains("light") ? "light" : "dark");
}

// On load
window.onload = () => {
  loadFromLocalStorage();
  renderBoard();
  const savedTheme = localStorage.getItem("kanbanTheme");
  if (savedTheme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
  }
};
