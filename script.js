const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;
  li.classList.add('fade-in');

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.style.marginLeft = '10px';
  delBtn.style.background = 'transparent';
  delBtn.style.border = 'none';
  delBtn.style.cursor = 'pointer';
  delBtn.onclick = () => li.remove();

  li.appendChild(delBtn);
  taskList.appendChild(li);
  input.value = '';
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push(li.firstChild.textContent); // hanya teks task
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    input.value = task;
    addTask();
  });
}

addBtn.addEventListener('click', () => {
  addTask();
  saveTasks();
});

// Load saat halaman dibuka
window.onload = loadTasks;
li.classList.add('bg-gray-100', 'p-2', 'rounded', 'flex', 'justify-between', 'items-center', 'shadow-sm');
