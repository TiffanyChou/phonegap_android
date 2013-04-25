const _screenW = 320;	// W size
const _screenH = 400;	// H size
const _imageW = 32;	
const _imageH = 32;
var flagData = new Array();	//flag location
var startTime = 0;	// 開始時間
var count = 0;	// take flag number
var timerID = null;	// ID
var bx = 160;	// ball X座標
var by = 160;	// ball Y座標
var dx = 0;	// X-add speed
var dy = 0;	// Y-add speed
var maxD = 10;	// add speed Max
var gameFlag = "start";	
var msgEle = document.getElementById("message");
var ballEle = document.getElementById("ball");
for(var i=0; i<10; i++){
	var ele = document.getElementById("f"+i);
	var x = Math.floor(Math.random()*10) * 32;
	var y = (i+1) * 32;
	flagData.push({x:x, y:y});
	ele.style.left = x+"px";
	ele.style.top = y+"px";
}
window.addEventListener("devicemotion", function(evt){
	if (gameFlag != "play"){ return; }	
	dx = dx + evt.accelerationIncludingGravity.x / 4;  // X-add speed
	dy = dy - evt.accelerationIncludingGravity.y / 4;  // Y-add speed
	if (dx < -maxD) { dx = -maxD; }
	if (dx > maxD) { dx = maxD; }
	if (dy < -maxD) { dy = -maxD; }
	if (dy > maxD) { dy = maxD; }
	bx = bx + dx;
	by = by + dy;
	if (bx < 0) { bx = 0; dx = -dx; }
	if (bx > (_screenW - _imageW)) { bx = _screenW-_imageW; dx = -dx; }
	if (by < 0) { by = 0; dy = -dy; }
	if (by > (_screenH - _imageH)) { by = _screenH-_imageH; dy = -dy; }
	ballEle.style.left = bx+"px";
	ballEle.style.top = by+"px";
	hitCheck();
}, true);
// 接触判定（矩形座標で当たり判定チェック）
function hitCheck(){
	for(var i=0; i<flagData.length; i++){
		var obj = document.getElementById("f"+i);
		var fx = flagData[i].x;
		var fy = flagData[i].y;
		if (((bx+_imageW) >= fx) && (bx <(fx+_imageW)) && ((by+_imageH) >= fy) && (by <(fy+_imageH)) ){
			if (obj.className.indexOf("fade") > -1) return;	
			obj.className = obj.className + " fade";	// link to css
			setTimeout('document.getElementById("f'+i+'").style.display="none"', 2000);	// 2秒後消失
			count = count + 1;	
			if (count >= 10){	
				gameFlag = "end";	
				var t = ((new Date()).getTime() - startTime) / 1000;
				clearInterval(timerID);
				var txt = "time you use："+t+"秒"+"<br>";
				txt = txt + "<button ontouchstart='location.reload()'>restart</button>";
				msgEle.innerHTML = txt;
			}
		}
	}
}

setTimeout("window.scrollTo(0,1)", 10);

document.addEventListener("touchstart", function(evt){
	if (gameFlag != "start"){ return; }	
	gameFlag = "play";	
	startTime = (new Date()).getTime();
	timerID = setInterval(function(){
		msgEle.innerText = (new Date()).getTime() - startTime+"msec";
	}, 100);
	var audioObj = document.getElementById("bgm");
	audioObj.play();
	audioObj.addEventListener("ended", function(){
		audioObj.currentTime = 0;
		audioObj.play();
	}, true);
}, true);
