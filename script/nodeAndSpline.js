var c = document.getElementById("center");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20, 200);
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
ctx.stroke();

function dragMousedown(e) {
    
}