const input = document.getElementById('main-input');
let allCompletedTasks = [];
let taskCount = 1;

function addTask() {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const task = event.target.value.trim();
            if (task.length >= 2) {
                const ul = document.getElementById('ul-list');
                ul.setAttribute('class','relative')
                const createListItem = document.createElement('li');
                createListItem.setAttribute('class', 'li-items flex items-center my-2 py-3');
                createListItem.setAttribute('data-taskNumber', taskCount);
                taskCount++;
                const checkBox = document.createElement('input');
                checkBox.setAttribute('type', 'checkbox');
                checkBox.setAttribute('class', 'check mr-2 flex');
                const span = document.createElement('input');
                span.value = task;
                createListItem.appendChild(checkBox);
                createListItem.appendChild(span);
                const createInput = document.createElement('input');
                createInput.setAttribute('class', 'hidden-input flex');
                createInput.style.display = 'none';
                createListItem.appendChild(createInput);
                const crossSymbol = document.createElement('span');
                crossSymbol.innerHTML = "&#10005;";
                crossSymbol.setAttribute('class', "text-red-500 delete cursor-pointer absolute end-0");
                createListItem.appendChild(crossSymbol);
                ul.append(createListItem);
                event.target.value = "";
                attachEventListeners(createListItem);
            }
        }
    });
}

function attachEventListeners(listItem) {
    const span = listItem.querySelector('input').nextSibling;
    const editInput = listItem.querySelector('.hidden-input');
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    const removeTask = listItem.querySelector('.delete');

    if(document.getElementsByClassName('li-items').length > 0) {
        document.querySelector('#footer').style.display = 'unset';
    }

    span.addEventListener('dblclick', function() {
        span.style.display = 'none';
        editInput.value = span.value;
        editInput.style.display = 'inline';
        editInput.focus();
    });

    editInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const task = editInput.value.trim();
            if (task.length >= 2) {
                span.value = task;
                editInput.style.display = 'none';
                span.style.display = 'inline';
            }
        }
    });

    editInput.addEventListener('blur', function() {
        editInput.style.display = 'none';
        span.style.display = 'inline';
    });

    checkbox.addEventListener('change', function() {
        const taskNumber = listItem.getAttribute('data-taskNumber');
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
            span.style.color = 'gray';
            if (!allCompletedTasks.includes(taskNumber)) {
                allCompletedTasks.push(taskNumber);
            }
        } else {
            span.style.textDecoration = 'none';
            span.style.color = 'black';
            const index = allCompletedTasks.indexOf(taskNumber);
            if (index > -1) {
                allCompletedTasks.splice(index, 1);
            }
        }
    });

    removeTask.addEventListener('click', function() {if(document.getElementsByClassName('li-items').length === 0) {
        document.querySelector('#footer').style.display = 'none';
    }
        const taskNumber = listItem.getAttribute('data-taskNumber');

        listItem.remove();
        const index = allCompletedTasks.indexOf(taskNumber);
        if (index > -1) {
            allCompletedTasks.splice(index, 1);
        }
        removeTaskFromOriginalList(taskNumber);
        reRenderActiveTasks();
        if(document.getElementsByClassName('li-items').length === 0) {
            document.querySelector('#footer').style.display = 'none';
        }
    });
}

function removeTaskFromOriginalList(taskNumber) {
    const allListItems = document.getElementById('ul-list').getElementsByClassName('li-items');
    for (let i = 0; i < allListItems.length; i++) {
        if (allListItems[i].getAttribute('data-taskNumber') === taskNumber) {
            allListItems[i].remove();
            break;
        }
    }
}

function reRenderActiveTasks() {
    const activeTasksLink = document.getElementById('tasks-active');
    if (activeTasksLink.classList.contains('active')) {
        getAllActiveTasks();
    }
}

function getAllActiveTasks() {
    const allListItems = document.getElementsByClassName('li-items');
    const displayResult = document.getElementById('display-result');
    const ulList = document.getElementById('ul-list');

    displayResult.innerHTML = ''; // Clear previous results
    ulList.style.display = 'none';
    displayResult.style.display = 'unset';

    const ul = document.createElement('ul');
    ul.setAttribute('class' , 'relative');
    ul.setAttribute('id', 'active-ul-list');

    for (let index = 0; index < allListItems.length; index++) {
        const taskNumber = allListItems[index].getAttribute('data-taskNumber');
        if (!allCompletedTasks.includes(taskNumber)) {
            const createListItem = document.createElement('li');
            createListItem.setAttribute('class', 'li-items flex items-center my-2 py-3');
            createListItem.setAttribute('data-taskNumber', taskNumber);
            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'check mr-2');
            const span = document.createElement('input');
            span.value = allListItems[index].querySelector('input').nextSibling.value;
            createListItem.appendChild(checkBox);
            createListItem.appendChild(span);
            const createInput = document.createElement('input');
            createInput.setAttribute('class', 'hidden-input');
            createInput.style.display = 'none';
            createListItem.appendChild(createInput);
            const crossSymbol = document.createElement('span');
            crossSymbol.innerHTML = "&#10005;";
            crossSymbol.setAttribute('class', "text-red-500 delete cursor-pointer absolute end-0");
            createListItem.appendChild(crossSymbol);
            ul.append(createListItem);
            attachEventListeners(createListItem);
        }
    }
    displayResult.appendChild(ul);
    document.getElementById('tasks-active').classList.add('active');
}

function getAllCompletedTasks() {
    const allListItems = document.getElementsByClassName('li-items');
    const displayResult = document.getElementById('display-result');
    const ulList = document.getElementById('ul-list');

    displayResult.innerHTML = '';
    ulList.style.display = 'none';
    displayResult.style.display = 'unset';

    const ul = document.createElement('ul');
    ul.setAttribute('class' , 'relative');
    ul.setAttribute('id', 'completed-ul-list');

    for (let index = 0; index < allListItems.length; index++) {
        const taskNumber = allListItems[index].getAttribute('data-taskNumber');
        if (allCompletedTasks.includes(taskNumber)) {
            const createListItem = document.createElement('li');
            createListItem.setAttribute('class', 'li-items flex items-center my-2 py-3');
            createListItem.setAttribute('data-taskNumber', taskNumber);
            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'check mr-2');
            checkBox.checked = true;
            const span = document.createElement('input');
            span.value = allListItems[index].querySelector('input').nextSibling.value;
            span.style.textDecoration = 'line-through';
            span.style.color = 'gray';
            createListItem.appendChild(checkBox);
            createListItem.appendChild(span);
            const createInput = document.createElement('input');
            createInput.setAttribute('class', 'hidden-input');
            createInput.style.display = 'none';
            createListItem.appendChild(createInput);
            const crossSymbol = document.createElement('span');
            crossSymbol.innerHTML = "&#10005;";
            crossSymbol.setAttribute('class', "text-red-500 delete cursor-pointer absolute end-0");
            createListItem.appendChild(crossSymbol);
            ul.appendChild(createListItem);
            attachEventListeners(createListItem);
        }
    }
    displayResult.appendChild(ul);
    document.getElementById('tasks-active').classList.remove('active');
}

function displayAllTasks() {
    const ulList = document.getElementById('ul-list');
    const displayResult = document.getElementById('display-result');

    displayResult.innerHTML = '';
    displayResult.style.display = 'none';
    ulList.style.display = 'block';
    
    document.getElementById('tasks-active').classList.remove('active');
    document.getElementById('tasks-completed').classList.remove('active');
}

function eraseCompletedTasks() {
    const allListItems = document.getElementsByClassName('li-items');
    for (let index = 0; index < allListItems.length; index++) {
        const taskNumber = allListItems[index].getAttribute('data-taskNumber');
        if (allCompletedTasks.includes(taskNumber)) {
            allListItems[index].remove();
            const completedIndex = allCompletedTasks.indexOf(taskNumber);
            if (completedIndex > -1) {
                allCompletedTasks.splice(completedIndex, 1);
            }
            index--;
        }
    }
    reRenderActiveTasks();
}

function makeEveryoneCompleted() {
    const mainCheckbox = document.getElementById('main-checkbox').checked;
    const allListItems = document.getElementsByClassName('li-items');
    if (mainCheckbox) {
        for (let index = 0; index < allListItems.length; index++) {
            const taskNumber = allListItems[index].getAttribute('data-taskNumber');
            const checkbox = allListItems[index].querySelector('input[type="checkbox"]');
            if (!allCompletedTasks.includes(taskNumber)) {
                allCompletedTasks.push(taskNumber);
                checkbox.checked = true;
                const span = allListItems[index].querySelector('span');
                span.style.textDecoration = 'line-through';
                span.style.color = 'gray';
            }
        }
    } else {
        allCompletedTasks = [];
        for (let index = 0; index < allListItems.length; index++) {
            const checkbox = allListItems[index].querySelector('input[type="checkbox"]');
            checkbox.checked = false;
            const span = allListItems[index].querySelector('span');
            span.style.textDecoration = 'none';
            span.style.color = 'black';
        }
    }
}

addTask();
document.getElementById('tasks-active').addEventListener('click', getAllActiveTasks);
document.getElementById('tasks-completed').addEventListener('click', getAllCompletedTasks);
document.getElementById('clear-tasks').addEventListener('click', eraseCompletedTasks);
document.getElementById('main-checkbox').addEventListener('click', makeEveryoneCompleted);
document.getElementById('all-tasks').addEventListener('click' , displayAllTasks);