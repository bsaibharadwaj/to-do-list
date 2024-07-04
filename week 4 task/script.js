// script.js
document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const getTasks = () => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    };

    const renderTasks = (tasks) => {
        todoList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `todo-item${task.completed ? " completed" : ""}`;
            li.dataset.index = index;

            const taskSpan = document.createElement("span");
            taskSpan.className = "task";
            taskSpan.textContent = task.name;
            taskSpan.addEventListener("click", () => toggleTaskCompletion(index));

            const actionsDiv = document.createElement("div");
            actionsDiv.className = "actions";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => editTask(index));

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(index));

            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);

            li.appendChild(taskSpan);
            li.appendChild(actionsDiv);

            todoList.appendChild(li);
        });
    };

    const addTask = (task) => {
        const tasks = getTasks();
        tasks.push({ name: task, completed: false });
        saveTasks(tasks);
        renderTasks(tasks);
    };

    const editTask = (index) => {
        const tasks = getTasks();
        const newTaskName = prompt("Edit task:", tasks[index].name);
        if (newTaskName !== null) {
            tasks[index].name = newTaskName;
            saveTasks(tasks);
            renderTasks(tasks);
        }
    };

    const deleteTask = (index) => {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks(tasks);
    };

    const toggleTaskCompletion = (index) => {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks(tasks);
    };

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = todoInput.value.trim();
        if (newTask) {
            addTask(newTask);
            todoInput.value = "";
        }
    });

    renderTasks(getTasks());
});
