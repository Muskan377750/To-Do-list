let inp = document.querySelector("input");
let btn = document.querySelector(".addBtn");
let ul = document.querySelector("ul");
let clearBtn = document.querySelector(".clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks
function loadTasks() {
  ul.innerHTML = "";
  tasks.forEach((task, index) => createTask(task.text, task.completed, index));
}
loadTasks();

// Add task
function addTask() {
  let value = inp.value.trim();
  if (value === "") return;

  let newTask = { text: value, completed: false };
  tasks.push(newTask);

  createTask(newTask.text, newTask.completed, tasks.length - 1);
  saveTasks();

  inp.value = "";
}

btn.addEventListener("click", addTask);

inp.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

// Create task
function createTask(text, completed, index) {
  let li = document.createElement("li");
  li.className = completed ? "completed fade-in" : "fade-in";
  li.dataset.index = index;

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
    let i = li.dataset.index;
    tasks[i].completed = !tasks[i].completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete
  li.querySelector(".delete").addEventListener("click", () => {
    li.classList.add("fade-out");

    setTimeout(() => {
      let i = li.dataset.index;
      tasks.splice(i, 1);
      saveTasks();
      loadTasks(); // re-index properly
    }, 300);
  });
}

// Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all
