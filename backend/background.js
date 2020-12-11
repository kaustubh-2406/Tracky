const tabTasks = [];
let prevActiveTab;

// regex for getting the url
const regex = /:\/\/(.[^/]+)/;

let dailyTaskLog;
let weeklyTaskLog;
let monthlyTaskLog;
let bookmarks = [];
let tasks;

let currentDate;
let newDay;

// TODO: works fine, however it would be more efficient to retrive data parallely (by using Promise.all) as the time starts piling up very quickly.
async function init() {
	dailyTaskLog = await retrive('daily');
	weeklyTaskLog = await retrive('weekly');
	monthlyTaskLog = await retrive('monthly');
	bookmarks = await retrive('bookmark');
	tasks = await retrive('task');

	currentDate = await retrive('date');
	newDay = {
		date: new Date().getDate(),
		day: new Date().getDay(),
		month: new Date().getMonth(),
	};

	doWork();
}

init();

// this functn currently just loops over a task and returns a new array
// TODO: sanitize the data...ie only send the required info to popup.
function sanitizeData(data) {
	if (Array.isArray(data)) return data;
	else {
		let returnVal = [];
		for (key in data) {
			returnVal = [...returnVal, ...data[key]];
		}
		return returnVal;
	}
}

async function doWork() {
	// currentDate = await retrive('date');
	setInterval(() => {
		// main logic...
		newDay = {
			date: new Date().getDate(),
			day: new Date().getDay(),
			month: new Date().getMonth(),
		};
		if (!currentDate) currentDate = newDay;
		console.log({ newDay, currentDate });

		if (currentDate.month !== newDay.month) {
			console.log('updated monthly info');
			monthlyTaskLog = {};
		}

		if (newDay.date != currentDate.date) {
			// locally storing the data...
			monthlyTaskLog[currentDate.date] = dailyTaskLog;
			weeklyTaskLog[currentDate.day] = dailyTaskLog;
			console.log('updated daily and weekly info');

			// storing info in chrome storage.
			store(dailyTaskLog, 'daily');
			store(weeklyTaskLog, 'weekly');
			store(monthlyTaskLog, 'monthly');
			store(newDay, 'date');

			// reset.
			currentDate = newDay;
			dailyTaskLog = [];
		}
		store(dailyTaskLog, 'daily');
		console.log('in setInterval');
	}, 1000);
}

// respond to popup page's request..
// retrive and store are defined in helpers.js
chrome.runtime.onMessage.addListener((msg, sender, sendRes) => {
	switch (msg.msg) {
		case 'daily task':
			sendRes(sanitizeData(dailyTaskLog));
			break;
		case 'weekly task':
			sendRes(sanitizeData(weeklyTaskLog));
			break;
		case 'monthly task':
			sendRes(sanitizeData(monthlyTaskLog));
			break;
		case 'add bookmark':
			if (bookmarks.indexOf(msg.url))
				bookmarks.splice(bookmarks.indexOf(msg.url), 1);
			bookmarks.push(msg.url);
			store(bookmarks, 'bookmark');
			sendRes('done');
			break;
		case 'get bookmark':
			// bookmarks = retrive('bookmark', msg.url);
			console.log('get book', bookmarks);
			sendRes(bookmarks);
			break;
		case 'modify bookmark':
			console.log(msg.payload);
			bookmarks = msg.payload;
			sendRes(bookmarks);
			store(bookmarks, 'bookmark');
			break;
		// only todo and stopwatch left
		case 'get todo':
			console.log('in get todo', tasks);
			sendRes(tasks);
			tasks = retrive('task');
			break;
		case 'update todo':
			// this is only remaining thing😁
			console.log('in update todo task', msg.payload);
			tasks = msg.payload;
			sendRes('done');
			store(tasks, 'task');
			break;
		default:
			console.log(msg);
			break;
	}
});
