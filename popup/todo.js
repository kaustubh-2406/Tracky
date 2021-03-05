import { handShake } from './utils.js';

// Form elements
const form = document.querySelector('#form-container');
const select = document.querySelector('#form-container .select');
const selectEl = document.querySelector('#form-container select');
const customTimeInput = document.querySelector('#form-container .custom');
const toggleTimeInputButton = document.querySelector('.toggle-btn');

//  UI elements
const taskContainer = document.querySelector('#todo .todo-item-container');
const newTodo = document.querySelector('.add-task');
const modalCloseBtn = document.querySelector('.form-close-btn');

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
	const div = document.createElement('div');
	div.classList.add('contents');
	div.innerText = task.task;
	if (task.completed) div.classList.add('completed');

	const completedBtn = document.createElement('button');
	completedBtn.innerText = '👍';
	completedBtn.classList.add('btn-complete');
	completedBtn.style.flexGrow = 'unset';
	completedBtn.addEventListener('click', () => {
		div.classList.toggle('completed');
		task.completed = true;
		todos = todos.map((todo) => (todo != task ? todo : task));
		updateTodosInStore(todos);
	});

	const trashBtn = document.createElement('button');
	trashBtn.classList.add('btn-trash');
	trashBtn.style.flexGrow = 'unset';
	trashBtn.innerText = '✂';
	trashBtn.addEventListener('click', () => {
		const index = todos.indexOf(task);
		todos.splice(index, 1);
		updateTodosInStore(todos);
		createUI(todos);
	});

	const btns = document.createElement('div');
	btns.style.width = '90px';
	btns.style.display = 'flex';
	btns.appendChild(completedBtn);
	btns.appendChild(trashBtn);

	const newDiv = document.createElement('div');
	newDiv.classList.add('task-cont');
	newDiv.style.border = '1px solid black';
	newDiv.style.borderRadius = '10px';
	newDiv.style.padding = '5px 20px';

	newDiv.appendChild(div);
	newDiv.appendChild(btns);

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
	todos.unshift(obj);
	updateTodosInStore(todos);
	createUI(todos);
	form.style.display = 'none';
});

newTodo.addEventListener('click', () => {
	form.style.display = 'block';
});

modalCloseBtn.addEventListener('click', () => {
	form.style.display = 'none';
});
