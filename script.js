document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false);  // Add tasks from storage without saving them again
        });
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // If taskText is empty, exit
        if (taskText.trim() === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item (li) element
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');  // Add a class for the task item
        listItem.textContent = taskText;

        // Create a remove button for the list item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');  // Add a class to the remove button

        // Event listener for removing the task when the remove button is clicked
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            // Remove the task from localStorage when it's deleted
            removeTaskFromLocalStorage(taskText);
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list (ul)
        taskList.appendChild(listItem);

        // Clear the input field for the next task
        taskInput.value = '';

        // Save the task to Local Storage if save is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);  // Add the task and save to localStorage
    });

    // Allow users to add tasks by pressing the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks from localStorage when the page loads
    loadTasks();
});
