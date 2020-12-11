import { handShake } from './utils.js';

const bookmarksTab = document.querySelector('.bookmark');
const bookmarkUL = document.querySelector('.bookmark-list');

bookmarksTab.addEventListener('click', (e) => {
	e.preventDefault();

	handShake({ msg: 'get bookmark' }, (bookmarks) => {
		console.log(bookmarks);
		showBookmarks(bookmarks);
	});
});

function showBookmarks(bookmarks) {
	const deleteBookmark = (contentToBeDeleted) => {
		let modifiedBookmarks = bookmarks.filter(
			(bookmark) => bookmark !== contentToBeDeleted
		);
		handShake(
			{
				msg: 'modify bookmark',
				payload: modifiedBookmarks,
			},
			(bookmarks) => {
				bookmarkUL.innerHTML = '';
				showBookmarks(bookmarks);
			}
		);
	};

	bookmarks.forEach((bookmark) => {
		bookmarkUL.appendChild(createListItem(bookmark, deleteBookmark));
	});
}

function createListItem(content, deleteBookmark) {
	const li = document.createElement('li');

	// showing content
	const span = document.createElement('span');
	span.innerText = content;
	span.style.pointer = 'cursor';
	span.addEventListener('click', () => {
		chrome.tabs.create({
			url: content,
		});
	});
	span.style.display = 'inline-block';

	// button to delete bookmark
	const btn = document.createElement('button');
	btn.innerText = 'X';
	btn.style.color = 'red';
	btn.style.display = 'inline-block';
	btn.style.backgroundColor = 'white';
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		deleteBookmark(content);
	});

	li.appendChild(span);
	li.appendChild(btn);

	return li;
}
