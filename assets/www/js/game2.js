var startTime = 0;	// 開始時間
var count = 0;	// 取旗的數量
var timerID = null;	//ID
var msgEle = document.getElementById("message");
for(var i=1; i<=10; i++){
	var ele = document.createElement("div");
	ele.id = "f"+i;
	ele.style.left = (Math.floor(Math.random()*10) * 32)+"px";
	ele.style.top = (Math.floor(Math.random()*13) * 32)+"px";
	ele.addEventListener("touchstart", function(evt){
		if (this.className == "fade") return;	
		var obj = this;
		setTimeout(function(){
			obj.style.display = "none";
		}, 2000);
		this.className = "fade";
		if (startTime == 0){	// 最初開始
			startTime = (new Date()).getTime();
			timerID = setInterval(function(){
				msgEle.innerText = (new Date()).getTime() - startTime+"msec";
			}, 100);
		}
		count = count + 1;	// 計算數量
		if (count >= 10){	// finish all flag
			var t = (new Date()).getTime() - startTime;
			clearInterval(timerID);
			var txt = "Timeing："+t+"msec"+"<br>";
			txt = txt + "<button ontouchstart='location.reload()'>Restart</button>";
			msgEle.innerHTML = txt;
		}
	}, true);
	document.getElementById("gameScreen").appendChild(ele);
}
setTimeout("window.scrollTo(0,1)", 10);	
setTimeout(function(){
	document.addEventListener("touchstart", function(evt){
		evt.preventDefault();	
	}, true);
}, 1500);
