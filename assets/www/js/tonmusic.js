var audio = new Audio();
var ele = document.querySelectorAll(".audioButton");//select all audio button
for(var i=0; i<ele.length; i++){
	ele[i].addEventListener("click", function(){
		var flag = this.className.indexOf("playing");
		audio.pause();	
		stopAnime();	
		if(flag > -1){ return; }
		audio = new Audio(this.title);
		audio.addEventListener("ended", function(){
			stopAnime();	
		}, true);
		audio.play();	
		this.className = this.className + " playing";	
	}, true);
}

function stopAnime(){
	for(var i=0; i<ele.length; i++){
		ele[i].className = ele[i].className.replace(/playing/, "");
	}
}
setTimeout(function(){ scrollTo(0,1); }, 100);
