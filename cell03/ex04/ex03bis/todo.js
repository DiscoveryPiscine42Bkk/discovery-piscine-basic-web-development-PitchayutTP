const $listDiv = $('#ft_list');

function loadTasks() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    // ex cookie --> username=alice; tasks=%5B%22Buy%20milk%22%2C%22Walk%20dog%22%5D --> split & add in array
    // ["tasks", "%5B%22Buy%20milk%22%2C%22Walk%20dog%22%5D"]
    if (!cookie) return;
    const tasks = JSON.parse(decodeURIComponent(cookie.split('=')[1])); //json --> array
    tasks.forEach(task => addTaskToDOM(task));
}

function saveTasks() {
    const tasks = [];
    $listDiv.find('.todo').each(function () {
        tasks.push($(this).text());
    });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; max-age=3600`; //array --> json
}

function addTaskToDOM(task) {
    const $div = $('<div></div>').text(task).addClass('todo');
    $div.on('click', function () { //delete
        if (confirm('Do you want to remove this task?')) {
            $div.remove();
            saveTasks();
        }
    });
    $listDiv.prepend($div);
}

$('#newBtn').on('click', function () {
    const task = prompt('Enter a new task:');
    if (task && task.trim() !== '') { //.trim() --> del space
        addTaskToDOM(task.trim());
        saveTasks();
    }
});

loadTasks();