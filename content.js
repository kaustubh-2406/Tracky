document.addEventListener('keydown', (e) => {
	// listening for ctrl+b key event.
	if (e.ctrlKey && e.key === 'b') {
		// checking if Url actually exists or not
		if (e.target.ownerDocument.URL.trim()) {
			chrome.runtime.sendMessage({
				msg: 'add bookmark',
				url: e.target.ownerDocument.URL,
			});
		}
	}
});
