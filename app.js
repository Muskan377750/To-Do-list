// app.js
const inp = document.querySelector(".inputBox input");
const btn = document.querySelector(".addBtn");
const ul = document.querySelector("ul");
const clearBtn = document.querySelector(".clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 1. Render function
function render() {
  ul.innerHTML = tasks.map((task, index) => `
    <li class="${task.completed ? 'completed' : ''} fade-in" data-index="${index}">
      <span>${task.text}</span>
      <div class="btn-group">
        <button class="done-btn">✔</button>
        <button class="del-btn">✖</button>
      </div>
    </li>
  `).join('');
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 2. Add task
function addTask() {
  const text = inp.value.trim();
  if (!text) return;
  
  tasks.push({ text, completed: false });
  inp.value = "";
  render();
}

// 3. Event Delegation (The "Smart" way)
ul.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const index = li.dataset.index;

  if (e.target.classList.contains("done-btn")) {
    tasks[index].completed = !tasks[index].completed;
    render();
  } 
  
  if (e.target.classList.contains("del-btn")) {
    li.classList.add("fade-out");
    li.addEventListener("animationend", () => {
      tasks.splice(index, 1);
      render();
    });
  }
});

// 4. Listeners
btn.addEventListener("click", addTask);
inp.addEventListener("keypress", (e) => e.key === "Enter" && addTask());
clearBtn.addEventListener("click", () => {
  if(confirm("Clear all tasks?")) {
    tasks = [];
    render();
  }
});

// Initial Load
render();