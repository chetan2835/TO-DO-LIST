// Load existing tasks from LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
        saveTasks();
    } else {
        alert("Please enter a task.");
    }
});

function addTask(taskText, isCompleted = false) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    if (isCompleted) span.classList.add("completed");

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    const items = document.querySelectorAll("#taskList li");

    items.forEach((item) => {
        const span = item.querySelector("span");
        tasks.push({ text: span.textContent, completed: span.classList.contains("completed") });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach((t) => addTask(t.text, t.completed));
    }
}