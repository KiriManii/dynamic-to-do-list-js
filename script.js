document.addEventListener('DOMContentLoaded', () => {
    // Selecting DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    function addTask() {
        // Get the value from the task input and trim any extra spaces
        const taskText = taskInput.value.trim();

        // Check if the input field is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;  // Exit the function if input is empty
        }

        // Create a new list item (li) element
        const listItem = document.createElement('li');

        // Set the text content of the list item to the task text
        listItem.textContent = taskText;

        // Create a remove button for the list item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Event listener for removing the task when the remove button is clicked
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list (ul)
        taskList.appendChild(listItem);

        // Clear the input field for the next task
        taskInput.value = '';
    }

    // Add an event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow users to add tasks by pressing the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
