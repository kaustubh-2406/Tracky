// stopwatch functionality left only
import { handShake } from './utils.js';
import { drawChart, displayInDiv } from './activity.js';
import './stopwatch.js';
import './todo.js';

const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('main > div');

const activityTab = document.querySelector('#activity-log');
let currentActiveTab = activityTab;

// adding navigation functionality...abstraction thodha jhyadda ho gya😅
Array.from(navBtns).forEach((btn, i) => {
	btn.addEventListener('click', () => {
		currentActiveTab.style.display = 'none';
		currentActiveTab = sections[i];
		currentActiveTab.style.display = 'block';
	});
});

handShake('daily task', (tasks) => {
	if (!tasks) {
		// TODO: error handling.
		console.log('no task today');
	} else {
		console.log(tasks);
		drawChart(tasks);
		displayInDiv(tasks);
	}
});
