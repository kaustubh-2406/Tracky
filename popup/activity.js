import { handShake } from './utils.js';
import { createSlice } from './canvas.js';
// import chartjs

const activityTabListContainer = document.querySelector('.activities');
const form = document.querySelector('form');

form.addEventListener('change', (e) => {
	switch (e.target.value) {
		case 'daily task':
		case 'weekly task':
		case 'monthly task':
			handShake(e.target.value, (tasks) => {
				if (!tasks) {
					// TODO: error handling.
					console.log('no task today');
				} else {
					drawChart(tasks);
					displayInDiv(tasks);
				}
			});
			console.log('getting info');
			break;
		default:
			console.log('something went wrong.');
			break;
	}
});

export function drawChart(sampleData) {
	let totalTime = sampleData.reduce((total, task) => total + task.time, 0);
	sampleData.forEach((task) => {
		createSlice(task.time, totalTime);
	});
	// TODO: make a colors array and then call displayInDiv in this function only
	// displayInDiv(tasks, colors)
}

export function displayInDiv(tasks) {
	tasks.forEach((task) => {
		const div = document.createElement('li');
		div.innerText = task.title;
		const span = document.createElement('div');
		span.innerText = task.url;
		const time = document.createElement('p');
		time.innerText = getTime(task.time);

		div.appendChild(span);
		div.appendChild(time);
		div.style.background = '#333';
		div.style.color = 'white';
		activityTabListContainer.appendChild(div);
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
