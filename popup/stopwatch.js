const stopwatch = document.querySelector('#timer');
const sec = document.querySelector('.stopwatch_seconds');
const min = document.querySelector('.stopwatch_min');
const hrs = document.querySelector('.stopwatch_hours');
const [startBtn, pauseBtn, resetBtn] = document.querySelectorAll(
	'#timer > div button'
);

let cleanInterval = null;

startBtn.addEventListener('click', () => {
	if (cleanInterval) clearInterval(cleanInterval);
	startStopWatch();
	startBtn.disabled = true;
});

pauseBtn.addEventListener('click', () => {
	clearInterval(cleanInterval);
	startBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
	clearInterval(cleanInterval);
	hrs.innerText = '0';
	min.innerText = '0';
	sec.innerText = '0';
	startBtn.disabled = false;
});

function startStopWatch() {
	cleanInterval = setInterval(() => {
		if (sec.innerText < 59) sec.innerText = Number(sec.innerText) + 1;
		else if (min.innerText < 59) {
			min.innerText = Number(min.innerText) + 1;
			sec.innerText = 0;
		} else {
			hrs.innerText = Number(hrs.innerText) + 1;
			min.innerText = 0;
		}
	}, 1000);
}
