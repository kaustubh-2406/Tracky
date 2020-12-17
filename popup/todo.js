import { handShake } from './utils.js';

const form = document.querySelector('#todo > form');
const select = document.querySelector('#todo .select');
const selectEl = document.querySelector('#todo select');
const customTimeInput = document.querySelector('#todo .custom');
const toggleTimeInputButton = document.querySelector('#todo .toggle-btn');
const taskContainer = document.querySelector('#todo .task-container');

// state...
let selectTagVisible = true;
let todos = [];

function getTodo() {
	handShake('get todo', (arr) => {
		todos = arr;
		createUI(todos);
	});
}
getTodo();

function updateTodosInStore(todos) {
	handShake({
		msg: 'update todo',
		payload: todos,
	});
}

function createNewTask(task) {
	const completedBtn = document.createElement('button');
	completedBtn.innerText = 'DONE';
	completedBtn.classList.add('btn-complete');
	completedBtn.addEventListener('click', () => {
		completedBtn.parentElement.classList.toggle('completed');
		task.completed = true;
		todos = todos.map((todo) => (todo != task ? todo : task));
		updateTodosInStore(todos);
	});

	const trashBtn = document.createElement('button');
	trashBtn.classList.add('btn-trash');
	trashBtn.innerText = '✂';
	trashBtn.addEventListener('click', () => {
		const index = todos.indexOf(task);
		todos.splice(index, 1);
		updateTodosInStore(todos);
		createUI(todos);
	});

	const div = document.createElement('div');
	div.classList.add('contents');
	div.innerText = task.task;

	const newDiv = document.createElement('div');
	newDiv.classList.add('task-cont');
	newDiv.appendChild(completedBtn);
	newDiv.appendChild(div);
	newDiv.appendChild(trashBtn);

	return newDiv;
}

function createUI(tasks) {
	taskContainer.innerHTML = '';
	tasks.forEach((task) => {
		taskContainer.appendChild(createNewTask(task));
	});
}

toggleTimeInputButton.addEventListener('click', () => {
	if (select.classList.contains('d-none')) {
		customTimeInput.classList.add('d-none');
		select.classList.remove('d-none');
		selectTagVisible = true;
	} else {
		customTimeInput.classList.remove('d-none');
		select.classList.add('d-none');
		selectTagVisible = false;
	}
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	// getting data from form
	const data = new FormData(form);

	const obj = {
		task: data.get('task'),
		timeRemaining: selectTagVisible
			? selectEl.value
			: data.get('time-remaining'),
		startTime: Date.now(),
		completed: false,
		deleted: false,
	};

	form.reset();
	todos.push(obj);
	updateTodosInStore(todos);
	createUI(todos);
});
