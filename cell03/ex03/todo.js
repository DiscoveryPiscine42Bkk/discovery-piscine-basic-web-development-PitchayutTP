const listDiv = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

function loadTasks() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    if (!cookie) return;
    const tasks = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    tasks.forEach(task => addTaskToDOM(task));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#ft_list .todo').forEach(div => {
        tasks.push(div.textContent);
    });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/; max-age=31536000`;
}

function addTaskToDOM(task) {
    const div = document.createElement('div');
    div.textContent = task;
    div.className = 'todo';
    div.addEventListener('click', () => {
        if (confirm('Do you want to remove this task?')) {
            div.remove();
            saveTasks();
        }
    });
    listDiv.prepend(div);
}

newBtn.addEventListener('click', () => {
    const task = prompt('Enter a new task:');
    if (task && task.trim() !== '') {
        addTaskToDOM(task.trim());
        saveTasks();
    }
});

loadTasks();