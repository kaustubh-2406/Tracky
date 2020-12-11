chrome.runtime.onMessage.addListener(async (msg, sender, sendRes) => {
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
			// used by content script for adding bookmarks.
			bookmark = store([...bookmark, msg.url], 'bookmark');
			break;
		case 'get bookmark':
			// bookmarks = await retrive('bookmark', msg.url);
			console.log(bookmark);
			sendRes(bookmark);
			break;
		case 'modify bookmark':
			bookmark = msg.payload;
			sendRes(bookmark);
			store(bookmark, 'bookmark');
			break;
		case 'get todo':
			sendRes(tasks);
			break;
		case 'update todo':
			tasks = msg.value;
			store(tasks);
			sendRes('done');
			break;
		default:
			console.log(msg);
			break;
	}
});

// storage........
function store(data, option) {
	switch (option) {
		case 'daily':
			chrome.storage.local.set({ dailyTask: data }, () => {
				console.log('stored daily data ');
			});
			break;
		case 'weekly':
			chrome.storage.local.set({ weeklyTask: data }, () => {
				console.log('stored weekly data ');
			});
			break;
		case 'monthly':
			chrome.storage.local.set({ monthlyTask: data }, () => {
				console.log('stored monthly data ');
			});
			break;
		case 'tasks':
			chrome.storage.local.set({ tasks: data }, () => {
				console.log('tasks stored succesfully...');
			});
			break;
		case 'bookmark':
			chrome.storage.local.set({ bookmark: data }, (val) => {
				console.log(val);
				return val;
			});
			break;
		default:
			console.log('something fishy is going on.');
	}
}

function retrive(option, params = '') {
	switch (option) {
		case 'date':
			chrome.storage.local.get(['date'], (data) => {
				if (data.date) currentDate = data.date;
				else {
					currentDate = {
						date: new Date().getDate(),
						day: new Date().getDay(),
						month: new Date().getMonth(),
					};
				}
			});
			break;
		case 'daily':
			chrome.storage.local.get(['dailyTask'], (data) => {
				if (data['dailyTask']) dailyTaskLog = data['dailyTask'];
				else dailyTaskLog = [];
				console.log('retrived data', data['dailyTask']);
			});
			break;
		case 'weekly':
			chrome.storage.local.get(['weeklyTask'], (data) => {
				console.log('retrived data', data);
				if (data['weeklyTask']) weeklyTaskLog = data['weeklyTask'];
				else weeklyTaskLog = {};
			});
			break;
		case 'monthly':
			chrome.storage.local.get(['monthlyTask'], (data) => {
				console.log('retrived data', data['monthlyTask']);
				if (data['monthlyTask']) monthlyTaskLog = data['monthlyTask'];
				else monthlyTaskLog = {};
			});
			break;
		case 'tasks':
			chrome.storage.local.get('tasks', (data) => {
				console.log(data);
				if (data['tasks']) tasks = data['tasks'];
				else tasks = [];
			});
			break;
		case 'bookmark':
			chrome.storage.local.get(['bookmark'], (data) => {
				console.log(data);
				// book(bookmarks, params);
				if (data['bookmark']) bookmark = data['bookmark'];
				else bookmark = [];
			});
			break;
		default:
			break;
	}
}
