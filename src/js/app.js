/* eslint-disable @cspell/spellchecker */
const $ = document;
const _id = (id) => {
	return $.querySelector('#' + id);
};
const addTask = _id('addTaskBtn');
const clearTasks = _id('clearStorageBtn');
const taskList = _id('tasks_list');
const taskInput = _id('taskInput');
const changeContentWindow = _id('changeTaskContent');
const newContent = _id('newContent');
const tasks = JSON.parse(localStorage.getItem('tasks')) ?? JSON.parse('[]');
const noTaskSection = $.querySelector('.noTaskSection');
// animate__zoomOut
_id('start_btn').addEventListener('click', function () {
	_id('intro_page').classList.add('animate__zoomOut');
	_id('main_page').hidden = false;
	$.body.style.overflowY = 'auto';
});
// close change task content window
changeContentWindow.firstElementChild.addEventListener('click', function () {
	this.parentElement.style.top = '-300px';
	newContent.value = null;
});
// fetch tasks from local storage
window.addEventListener('load', () => {
	if (tasks.length !== 0) {
		noTaskSection.hidden = true;
		tasks.forEach((task) => {
			taskList.appendChild(createTaskElement(task.content, task.status));
		});
	} else {
		noTaskSection.hidden = false;
	}
});
//
// create task
addTask.addEventListener('click', () => {
	noTaskSection.hidden = true;
	createTask(taskInput.value);
	taskInput.value = null;
	taskInput.focus();
});

function createTask(content) {
	if (content.trim() !== '') {
		if (isDuplicateTask(content)) {
			alert('the task is already defined');
		} else {
			taskList.appendChild(createTaskElement(content));
			addToLocalStorage(content);
		}
	} else {
		alert('task value should not be empty');
		noTaskSection.hidden = false;
	}
}

// check for duplicate value
function isDuplicateTask(taskContent) {
	const selectedTaskIndex = tasks.findIndex((task) => {
		return task.content === taskContent;
	});
	return selectedTaskIndex !== -1;
}

function createTaskElement(content, status = 'UnCompleted') {
	const taskElement = $.createElement('li');
	taskElement.className = `task_item ${status}`;
	const taskTitle = $.createElement('span');
	taskTitle.classList.add('task_title');
	taskTitle.innerHTML = content;
	// buttons
	// change status btn
	const changeStatusBtn = $.createElement('input');
	changeStatusBtn.setAttribute('type', 'checkbox');
	changeStatusBtn.className = 'TaskStatus';
	changeStatusBtn.checked = status === 'completed' ? true : false;
	// remove button
	const removeTaskBtn = $.createElement('button');
	removeTaskBtn.classList.add('removeTask_btn');
	const removeIcon = $.createElement('i');
	removeIcon.className = 'fa-solid fa-trash';
	removeTaskBtn.append(removeIcon);
	// edit button
	const editBtn = $.createElement('button');
	editBtn.classList.add('editTask_btn');
	const editIcon = $.createElement('i');
	editIcon.className = 'fa-solid fa-pen-to-square';
	editBtn.append(editIcon);
	editBtn.addEventListener('click', function () {
		changeContentWindow.lastElementChild.addEventListener(
			'click',
			function () {
				changeContentWindow.style.top = '-300px';
				if (newContent.value.trim() !== '') {
					updateLocalStorageContent(
						taskTitle.innerHTML,
						newContent.value,
					);
					taskTitle.innerHTML = newContent.value;
				} else {
					alert('the input should not be empty');
				}
			},
		);
	});
	//
	taskElement.append(taskTitle, changeStatusBtn, removeTaskBtn, editBtn);
	return taskElement;
}

function addToLocalStorage(content) {
	tasks.push({
		content: content,
		status: 'uncompleted',
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage(taskContent, newStatus) {
	const selectedTaskIndex = tasks.findIndex((task) => {
		return task.content === taskContent;
	});
	const updatedTask = tasks[selectedTaskIndex];
	updatedTask.status = newStatus;
	tasks.fill(updatedTask, selectedTaskIndex, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskContent) {
	const selectedTaskIndex = tasks.findIndex((task) => {
		return task.content === taskContent;
	});
	tasks.splice(selectedTaskIndex, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorageContent(taskContent, newContent) {
	const selectedTaskIndex = tasks.findIndex((task) => {
		return task.content === taskContent;
	});
	const updatedTask = tasks[selectedTaskIndex];
	updatedTask.content = newContent;
	tasks.fill(updatedTask, selectedTaskIndex, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear tasks
clearTasks.addEventListener('click', () => {
	taskList.innerHTML = null;
	localStorage.clear();
});
// tasks btns functionality
taskList.addEventListener('click', function (event) {
	// remove tasks btns functionality
	if (
		event.target.tagName === 'I' &&
		event.target.classList.contains('fa-trash')
	) {
		if (confirm('Are you sure ? ')) {
			event.target.parentElement.parentElement.remove();
			removeTask(
				event.target.parentElement.parentElement.firstElementChild
					.innerHTML,
			);
			if (JSON.parse(localStorage.getItem('tasks')).length === 0) {
				noTaskSection.hidden = false;
			}
		}
	}
	// change content btns functionality
	if (
		event.target.tagName === 'I' &&
		event.target.classList.contains('fa-pen-to-square')
	) {
		changeContentWindow.style.top = '0';
	}
	// change status btns functionality
	if (
		event.target.tagName === 'INPUT' &&
		event.target.classList.contains('TaskStatus')
	) {
		if (event.target.parentElement.classList.contains('completed')) {
			event.target.checked = false;
			event.target.parentElement.className = 'task_item';
			updateLocalStorage(
				event.target.previousElementSibling.innerHTML,
				'uncompleted',
			);
		} else {
			event.target.checked = true;
			event.target.parentElement.className = 'task_item completed';
			updateLocalStorage(
				event.target.previousElementSibling.innerHTML,
				'completed',
			);
		}
	}
});
