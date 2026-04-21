let inp = document.querySelector("input");
let addBtn = document.querySelector(".addBtn");
let ul = document.querySelector("ul");
let clearBtn = document.querySelector(".clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function render() {
  ul.innerHTML = "";

  if (tasks.length === 0) {
    ul.innerHTML = "<li>No tasks yet ☕</li>";
    return;
  }

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="btn-group">
        <button class="done-btn">✔</button>
        <button class="del-btn">✖</button>
      </div>
    `;

    ul.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
addBtn.onclick = () => {
  let text = inp.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now().toString(),
    text: text,
    completed: false,
  });

  inp.value = "";
  render();
};

// Enter key support
inp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Handle clicks (delete + done)
ul.addEventListener("click", (e) => {
  let li = e.target.closest("li");
  if (!li) return;

  let id = li.dataset.id;

  if (e.target.closest(".done-btn")) {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
  }

  if (e.target.closest(".del-btn")) {
    tasks = tasks.filter((t) => t.id !== id);
  }

  render();
});

// Clear all
clearBtn.onclick = () => {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    render();
  }
};

// Initial load
render();