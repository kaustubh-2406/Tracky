// canvas piece..
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let startAngle = 0;
const radius = 100;
let endAngle;
const center = {
	x: canvas.width / 2,
	y: canvas.height / 2,
};

function radians(deg) {
	return (deg * Math.PI) / 180;
}

function randomColor() {
	return '#' + Math.random().toString(16).slice(2, 8);
}

export function createSlice(itsShare, total) {
	endAngle = radians((itsShare / total) * 360) + startAngle;
	ctx.beginPath();
	ctx.moveTo(center.x, center.y);
	ctx.arc(center.x, center.y, radius, startAngle, endAngle, false);
	ctx.lineTo(center.x, center.y);
	ctx.fillStyle = randomColor();
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	startAngle = endAngle;
}
