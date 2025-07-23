const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme from localStorage
const userPref = localStorage.getItem('theme');
if (userPref === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '🌞 Light Mode';
}

// Dark mode toggle logic
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '🌞 Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

addBtn.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  li.className = `
    fade-in bg-gray-100 p-2 rounded flex justify-between items-center shadow-sm 
    dark:bg-gray-700 dark:text-white dark:shadow-inner transition-colors duration-300
  `;

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.className = "ml-2 text-gray-500 hover:text-red-500";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
  input.value = '';
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push(li.firstChild.textContent.trim());
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => {
    input.value = task;
    addTask();
  });
}
