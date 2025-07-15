"use strict";
window.onload = () => {
    let tasks = [];
    let taskId = 0;
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("task-list");
    const addBtn = document.getElementById("plus-btn");
    function createTaskElement(task) {
        const li = document.createElement("li");
        li.id = `task-${task.id}`;
        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const textNode = document.createTextNode(task.text);
        checkbox.onchange = () => {
            textNode.parentElement.style.textDecoration = checkbox.checked ? "line-through" : "none";
        };
        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "editbtn";
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editTask(task.id);
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "deletebtn";
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(checkbox);
        li.appendChild(textNode);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        return li;
    }
    function addTask() {
        const text = taskInput.value.trim();
        if (text === "")
            return;
        const newTask = {
            id: taskId++,
            text,
        };
        tasks.push(newTask);
        const li = createTaskElement(newTask);
        taskList.appendChild(li);
        taskInput.value = "";
    }
    function editTask(id) {
        const task = tasks.find((t) => t.id === id);
        if (!task)
            return;
        const newText = prompt("Edit task:", task.text);
        if (newText === null || newText.trim() === "")
            return;
        task.text = newText.trim();
        const li = document.getElementById(`task-${id}`);
        if (li) {
            li.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.nodeValue = task.text;
                }
            });
        }
    }
    function deleteTask(id) {
        tasks = tasks.filter((t) => t.id !== id);
        const li = document.getElementById(`task-${id}`);
        if (li) {
            taskList.removeChild(li);
        }
    }
    addBtn.addEventListener("click", addTask);
};
