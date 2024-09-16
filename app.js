const apiUrl = 'http://localhost:3000/tasks';

// Fetch and display tasks
async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  displayTasks(tasks);
}

// Display tasks in the UI
function displayTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `
      ${task.name}
      <button onclick="deleteTask('${task.id}')">Delete</button>
      <button onclick="editTask('${task.id}')">Edit</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Add a new task
async function addTask() {
  const taskName = document.getElementById('taskInput').value;
  if (!taskName) return;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: taskName }),
  });

  document.getElementById('taskInput').value = '';
  fetchTasks();
}

// Delete a task
async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Edit a task
async function editTask(id) {
  const newTaskName = prompt('Enter new task name:');
  if (!newTaskName) return;

  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newTaskName }),
  });

  fetchTasks();
}

// Initial fetch of tasks
fetchTasks();
