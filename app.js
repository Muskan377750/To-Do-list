let inp = document.querySelector("input");
let btn = document.querySelector(".addBtn");
let ul = document.querySelector("ul");
let clearBtn = document.querySelector(".clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
function loadTasks() {
  ul.innerHTML = "";
  tasks.forEach((task, index) => {
    createTask(task.text, task.completed, index);
  });
}
loadTasks();

// Add task
function addTask() {
  if (inp.value.trim() === "") return;

  tasks.push({ text: inp.value, completed: false });
  saveTasks();
  loadTasks();
  inp.value = "";
}

btn.addEventListener("click", addTask);

// Enter key support
inp.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

// Create task UI
function createTask(text, completed, index) {
  let li = document.createElement("li");
  li.className = completed ? "completed" : "";

  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button class="done">✔</button>
      <button class="delete">✖</button>
    </div>
  `;

  ul.appendChild(li);

  // Done toggle
  li.querySelector(".done").addEventListener("click", () => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    loadTasks();
  });

  // Delete task
  li.querySelector(".delete").addEventListener("click", () => {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
  });
}

// Save to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
clearBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  loadTasks();
});

function toggleTheme() {
  document.body.classList.toggle("light");
}