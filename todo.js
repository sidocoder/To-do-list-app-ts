var tasks = [];
var taskId = 0;

var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("task-list");
var addBtn = document.getElementById("plus-btn");

function createTaskElement(task) {
    var li = document.createElement("li");
    li.id = "task-" + task.id;

    //  add Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const textNode = document.createTextNode(task.text);

    checkbox.onchange = () => {
        textNode.parentElement.style.textDecoration = checkbox.checked ? "line-through" : "none";
    };

    //Edit button
    var editBtn = document.createElement("button");
    editBtn.className = "editbtn";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = function () {
        editTask(task.id);
    };

    //Delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "deletebtn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = function () {
        deleteTask(task.id);
    };

   
    li.appendChild(checkbox);
    li.appendChild(textNode); 
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

// Add a new task
function addTask() {
    var text = taskInput.value.trim();
    if (text === "") return;

    var newTask = {
        id: taskId++,
        text: text,
    };

    tasks.push(newTask);
    var li = createTaskElement(newTask);
    taskList.appendChild(li);
    taskInput.value = "";
}

// Edit task
function editTask(id) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (!task) return;

    var newText = prompt("Edit task:", task.text);
    if (newText === null || newText.trim() === "") return;

    task.text = newText.trim();

    var li = document.getElementById("task-" + id);
    if (li) {
        // update text node
        li.childNodes.forEach(function (node) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = task.text;
            }
        });
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    var li = document.getElementById("task-" + id);
    if (li) {
        taskList.removeChild(li);
    }
}

// Event listener
addBtn.addEventListener("click", addTask);
