import { handShake } from './utils.js';
import { generateActivityUI } from './activity.js';
import './stopwatch.js';
import './todo.js';

const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('main > div');

const activityTab = document.querySelector('#activity-log');
let currentActiveTab = activityTab;

// setting event listeners for all the bottom navigation buttons
navBtns.forEach((btn, i) => {
	btn.addEventListener('click', () => {
		currentActiveTab.style.display = 'none';
		currentActiveTab = sections[i];
		currentActiveTab.style.display = 'block';
	});
});

handShake('daily task', (tasks) => {
	generateActivityUI(tasks);
});
