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
		case 'bookmark':
			chrome.storage.local.set({ bookmark: data }, (val) => {
				console.log(val);
			});
			break;
		case 'date':
			chrome.storage.local.set({ date: data }, (data) =>
				console.log('stored date', data)
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
		case 'bookmark':
			chrome.storage.local.get(['bookmark'], (data) => {
				console.log(data);
				if (data['bookmark']) bookmarks = data['bookmark'];
				else bookmarks = [];
				book(bookmarks, params);
			});
			break;
		default:
			break;
	}
}
