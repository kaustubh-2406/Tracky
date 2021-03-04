import { handShake } from './utils.js';
import { createSlice } from './canvas.js';

const errorEl = document.querySelector('.error');
const activityTabListContainer = document.querySelector('.activities');
const form = document.querySelector('form');

form.addEventListener('change', (e) => {
	switch (e.target.value) {
		case 'daily task':
		case 'weekly task':
		case 'monthly task':
			handShake(e.target.value, (tasks) => generateActivityUI(tasks));
			break;
		default:
			console.log('something went wrong.');
			break;
	}
});

function drawChart(tasks) {
	let colorsArray = [];
	let totalTime = tasks.reduce((total, task) => total + task.time, 0);
	tasks.forEach((task) => {
		let generatedColor = createSlice(task.time, totalTime);
		colorsArray.push(generatedColor);
	});
	displayInDiv(tasks, colorsArray);
}

function displayInDiv(tasks, colorsArray) {
	console.log('after', colorsArray);
	tasks.forEach((task, i) => {
		const li = document.createElement('li');

		const p = document.createElement('p');
		p.innerText = task.url;
		p.style.padding = '5px';

		const container = document.createElement('p');
		container.classList.add('activity-container');
		const sub = document.createElement('sub');
		sub.innerText = getTime(task.time);
		const colorEl = document.createElement('span');
		colorEl.style.backgroundColor = colorsArray[i];
		colorEl.style.border = '1px solid black';
		colorEl.style.boxSizing = 'border-box';

		container.appendChild(sub);
		container.appendChild(colorEl);

		li.appendChild(p);
		li.appendChild(container);
		li.classList.add('list-items');
		activityTabListContainer.appendChild(li);
	});
}

function getTime(time) {
	const inSec = Math.floor((time / 1000) % 60);
	const inMin = Math.floor(time / 1000 / 60);
	const inHours = Math.floor(inMin / 60);
	const inDays = Math.floor(inHours / 24);

	if (inDays > 0) {
		return inDays + ' days' + inHours + ' hours';
	} else if (inHours > 0) {
		return inHours + ' hours' + inMin + ' min';
	} else if (inMin > 0) {
		return inMin + ' minutes' + inSec + ' sec';
	} else {
		return inSec + 'sec';
	}
}

export function generateActivityUI(tasks) {
	if (tasks.length) {
		errorEl.style.display = 'none';
		drawChart(tasks);
	} else {
		document
			.querySelectorAll('#activity-log > *')
			.forEach((el) => (el.style.display = 'none'));
		errorEl.style.display = 'block';
		errorEl.innerHTML =
			'Opps! it looks like there is nothing to show.<br><sub style="color:red"> A side note, there is one issue it doesnot update the tasks in real-time, ie you need to close a tab to see its logs.</sub>';
	}
}
