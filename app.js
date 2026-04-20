const todoApp = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
    },

    cacheDOM() {
        this.inp = document.querySelector("input");
        this.btn = document.querySelector(".addBtn");
        this.list = document.querySelector("ul");
        this.clear = document.querySelector(".clearBtn");
    },

    bindEvents() {
        this.btn.onclick = () => this.addTask();
        this.inp.onkeypress = (e) => e.key === "Enter" && this.addTask();
        this.clear.onclick = () => this.clearAll();
        
        // Delegation for performance
        this.list.onclick = (e) => {
            const id = e.target.closest("li")?.dataset.id;
            if (e.target.classList.contains("done-btn")) this.toggleTask(id);
            if (e.target.classList.contains("del-btn")) this.deleteTask(id);
        };
    },

    addTask() {
        const val = this.inp.value.trim();
        if (!val) return;
        
        this.tasks.push({ id: Date.now().toString(), text: val, completed: false });
        this.inp.value = "";
        this.render();
    },

    toggleTask(id) {
        this.tasks = this.tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
        this.render();
    },

    deleteTask(id) {
        const el = this.list.querySelector(`[data-id="${id}"]`);
        el.style.transform = "translateX(50px)";
        el.style.opacity = "0";
        
        setTimeout(() => {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.render();
        }, 300);
    },

    clearAll() {
        if (confirm("Delete everything?")) {
            this.tasks = [];
            this.render();
        }
    },

    render() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        
        if (this.tasks.length === 0) {
            this.list.innerHTML = `<p style="color:#64748b; font-size: 0.9rem">No tasks yet. Enjoy your day! ☕</p>`;
            return;
        }

        this.list.innerHTML = this.tasks.map(task => `
            <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <span>${task.text}</span>
                <div class="btn-group">
                    <button class="done-btn">✔</button>
                    <button class="del-btn">✖</button>
                </div>
            </li>
        `).join('');
    }
};

todoApp.init();