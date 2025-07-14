window.onload = () => {
interface Task {
  id: number;
  text: string;
}

let tasks: Task[] = [];
let taskId = 0;

const taskInput = document.getElementById("taskInput")! as HTMLInputElement;
const taskList = document.getElementById("task-list")! as HTMLUListElement;
const addBtn = document.getElementById("plus-btn")! as HTMLButtonElement;


// Create a task element in the DOM
function createTaskElement(task: Task): HTMLLIElement {
  const li = document.createElement("li");
  li.id = `task-${task.id}`;
  //check-box
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = () => {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  };

  const taskText = document.createElement("text");
  taskText.textContent = task.text;
  checkbox.onchange = () => {
  taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
    };

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.className = "deletebtn";
  editBtn.onclick = () => editTask(task.id);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deletebtn";
  deleteBtn.onclick = () => deleteTask(task.id);

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

// Add new task
function addTask(): void {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask: Task = {
    id: taskId++,
    text,
  };

  tasks.push(newTask);
  const li = createTaskElement(newTask);
  taskList.appendChild(li);
  taskInput.value = "";
}

// Edit task
function editTask(id: number): void {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const newText = prompt("Edit task:", task.text);
  if (newText === null || newText.trim() === "") return;

  task.text = newText.trim();

  const li = document.getElementById(`task-${id}`) as HTMLLIElement;
  if (li) {
    li.firstChild!.textContent = task.text;
  }
}

// Delete task
function deleteTask(id: number): void {
  tasks = tasks.filter((t) => t.id !== id);
  const li = document.getElementById(`task-${id}`);
  if (li) {
    taskList.removeChild(li);
  }
}

// Event listener
addBtn.addEventListener("click", addTask);
};
