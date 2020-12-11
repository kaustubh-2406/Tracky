// #TODO: add snapshot functionality
// --------------IMPORTANT-----------------

chrome.tabs.onCreated.addListener((e) => {
	prevActiveTab = e.id;
	tabTasks.push({
		id: e.id,
		url: e.url,
		title: e.title,
		time: 0,
		activationTime: Date.now(),
	});
	console.log('created instance of tab', tabTasks);
});

chrome.tabs.onUpdated.addListener((id, changeInfo, tabInfo) => {
	tabTasks.forEach((tab) => {
		if (tab.id === id && tabInfo.status == 'complete') {
			const url = new URL(tabInfo.url);
			const params = new URLSearchParams(url.search).get('q');

			tab.url = tabInfo.url.match(regex)[1] || undefined;
			tab.title = tab.url != 'www.google.com' ? tabInfo.title : params;
			console.log('updated', tab);
		}
	});
	prevActiveTab = id;
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	// TODO: removeInfo contains windowId so if we want to extend the feature to other windows as well then we can do so..
	tabTasks.forEach((tab, i) => {
		if (tab.id == tabId) {
			if (tab.id === prevActiveTab) {
				dailyTaskLog.push({
					...tab,
					time: tab.time + (Date.now() - tab.activationTime),
				});
			} else {
				dailyTaskLog.push(tab);
			}
			tabTasks.splice(i, 1);
			return;
		}
	});
});

chrome.tabs.onActivated.addListener((activeInfo) => {
	tabTasks.forEach((tab, i) => {
		if (tab.id === activeInfo.tabId) {
			tab.activationTime = Date.now();
			console.log('from activated', activeInfo);
		} else if (tab.id === prevActiveTab) {
			tab.time += Date.now() - tab.activationTime;
			console.log(i + 'th tab minimized', {
				id: tab.id,
				url: tab.url,
				time: tab.time,
			});
		}
	});
	prevActiveTab = activeInfo.tabId;
});
