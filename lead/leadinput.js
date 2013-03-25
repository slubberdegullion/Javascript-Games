//leadinput.js
//Parker Bourassa
var leadinput.keysDown = {};//handles multiple keys

window.addEventListener("keydown", function (e){
	//$("debug").innerHTML = ("Key " + e.keyCode + " was pressed.");
	keysDown[e.keyCode] = true;
	invalidate();
	//return false;
	e.preventDefault();
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	invalidate();
}, false);

function getMouse(e) {
    var x = Math.floor(e.pageX - $("canvas").getBoundingClientRect().left);
    var y = Math.floor(e.pageY - $("canvas").getBoundingClientRect().top);
    display.mx = x;
    display.my = y;
}
