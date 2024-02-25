document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage if available
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-delete">Delete</button>
            `;
            taskList.appendChild(taskItem);

            // Add event listener to delete button
            const deleteBtn = taskItem.querySelector('.task-delete');
            deleteBtn.addEventListener('click', function () {
                tasks.splice(index, 1);
                renderTasks();
                saveTasks();
            });

            // Add event listener to checkbox to mark task as completed
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function () {
                task.completed = checkbox.checked;
                saveTasks();
            });
        });
    }

    // Function to add task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            renderTasks();
            saveTasks();
            taskInput.value = '';
        }
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for add task button
    addTaskBtn.addEventListener('click', addTask);

    // Render tasks when the page loads
    renderTasks();
});
