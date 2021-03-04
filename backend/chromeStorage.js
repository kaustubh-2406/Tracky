// storage........
function store(data, option) {
	switch (option) {
		case 'daily':
			chrome.storage.local.set({ dailyTask: data });
			break;
		case 'weekly':
			chrome.storage.local.set({ weeklyTask: data });
			break;
		case 'monthly':
			chrome.storage.local.set({ monthlyTask: data });
			break;
		case 'date':
			chrome.storage.local.set({ date: data });
			break;
		case 'task':
			chrome.storage.local.set({ task: data });
			break;
		default:
			break;
	}
}

function retrive(option) {
	switch (option) {
		case 'date':
			chrome.storage.local.get('date', (data) => {
				if (data != {}) currentDate = data.date;
				else {
					currentDate = {
						date: new Date().getDate(),
						day: new Date().getDay(),
						month: new Date().getMonth(),
					};
					store({ date: currentDate });
				}
			});
			break;
		case 'daily':
			chrome.storage.local.get('dailyTask', (data) => {
				if (data.dailyTask) dailyTaskLog = data.dailyTask;
				else dailyTaskLog = [];
			});
			break;
		case 'weekly':
			chrome.storage.local.get('weeklyTask', (data) => {
				if (data.weeklyTask) weeklyTaskLog = data.weeklyTask;
				else weeklyTaskLog = {};
			});
			break;
		case 'monthly':
			chrome.storage.local.get('monthlyTask', (data) => {
				if (data.monthlyTask) monthlyTaskLog = data.monthlyTask;
				else monthlyTaskLog = {};
			});
			break;
		case 'task':
			chrome.storage.local.get('task', (data) => {
				if (data.task) tasks = data.task;
				else tasks = [];
			});
			break;
		default:
			break;
	}
}
