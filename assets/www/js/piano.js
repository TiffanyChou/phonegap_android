var audio = [];	// audioオブジェクトを入れるための変数を用意する
var filename = ["C3","C3u","D3","D3u","E3","F3","F3u","G3","G3u","A3","A3u","B3","C4"];
for(var i=0; i<filename.length; i++){
	audio[filename[i]] = new Audio("sound/"+filename[i]+".mp3");
}

var ele = document.querySelectorAll(".sound");
for(var i=0; i<ele.length; i++){
	ele[i].addEventListener("click", function(){
		try{ audio[this.id].currentTime = 0; }catch(e){}
		audio[this.id].play();
	}, true);
}

setTimeout(function(){ scrollTo(0,1); }, 100);
