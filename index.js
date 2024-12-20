function saveTasksToLocalStorage() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task');
    
    taskElements.forEach(task => {
        const label = task.querySelector('.task-label').textContent;
        const isChecked = task.querySelector('.task-checkbox').checked;
        tasks.push({ label, isChecked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const listItem = document.createElement('div');
        listItem.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.isChecked;

        const label = document.createElement('label');
        label.className = 'task-label';
        label.textContent = task.label;

        const dltButton = document.createElement('button');
        dltButton.className = 'delete-task';
        dltButton.innerHTML = "<i class='bx bxs-trash-alt'></i>";
        dltButton.style.marginLeft = "5px";
        dltButton.style.border = "none";
        dltButton.style.borderRadius = "5px";
        dltButton.style.backgroundColor = "#023047";
        dltButton.style.color = "#f4f4f4";

        dltButton.onclick = function() {
            listItem.remove();
            saveTasksToLocalStorage();
        }

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(dltButton);

        document.getElementById('list').appendChild(listItem);

        checkbox.onchange = saveTasksToLocalStorage;
    });
}


function getNewTask() {
    const taskInput = document.getElementById('addTask');
    const taskValue = taskInput.value.trim();

    if (!taskValue) {
        alert("Please write a task!");
        return;
    }

    const listItem = document.createElement('div');
    listItem.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = 'task-checkbox';

    const label = document.createElement('label');
    label.className = 'task-label';
    label.textContent = taskValue;

    const dltButton = document.createElement('button');
    dltButton.className = 'delete-task';
    dltButton.innerHTML = "<i class='bx bxs-trash-alt'></i>";
    dltButton.style.marginLeft = "5px";
    dltButton.style.border = "none";
    dltButton.style.borderRadius = "5px";
    dltButton.style.backgroundColor = "#023047";
    dltButton.style.color = "#f4f4f4";

    dltButton.onclick = function() {
        listItem.remove();
        saveTasksToLocalStorage();
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(dltButton);

    document.getElementById('list').appendChild(listItem);

    checkbox.onchange = saveTasksToLocalStorage;

    saveTasksToLocalStorage();

    taskInput.value = '';
}


document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
