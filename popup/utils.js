export function handShake(message, doSomething) {
	const thingToSend = typeof message === 'object' ? message : { msg: message };
	chrome.runtime.sendMessage(thingToSend, (tasks) => {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError);
		} else {
			console.log(tasks);
			if (typeof doSomething === 'function') doSomething(tasks);
		}
	});
}
