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
		case 'date':
			chrome.storage.local.set({ date: data });
			break;
		case 'task':
			chrome.storage.local.set({ task: data }, () =>
				console.log('stored the tasks ')
			);
			break;
		default:
			console.log('something fishy is going on.');
	}
}

function retrive(option, params = '') {
	switch (option) {
		case 'date':
			chrome.storage.local.get(['date'], (data) => {
				console.log('from retrive date', data.date);
				if (data != {}) currentDate = data.date;
				else {
					currentDate = {
						date: new Date().getDate(),
						day: new Date().getDay(),
						month: new Date().getMonth(),
					};
					store({ date: currentDate }, (d) =>
						console.log('stored date in storage', d)
					);
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
		case 'task':
			chrome.storage.local.get('task', (data) => {
				if (data['task']) tasks = data['task'];
				else tasks = [];
			});
			break;
		default:
			break;
	}
}
