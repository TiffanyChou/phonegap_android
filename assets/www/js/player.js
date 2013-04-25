var audio = new Audio();
var ele = document.querySelectorAll(".audioButton");//select all audio button
for(var i=0; i<ele.length; i++){
	ele[i].addEventListener("click", function(){
		var flag = this.className.indexOf("playing");
		//audio.pause();	
		stopAnime();	
		if(flag > -1){ return; }
		playAudio("/android_asset/"+this.title);
		//audio = new Audio(this.title);
		//audio.addEventListener("ended", function(){
		stopAnime();	
		}, true);
		//audio.play();	
		this.className = this.className + " playing";	
	}, true);
}

function stopAnime(){
	for(var i=0; i<ele.length; i++){
		ele[i].className = ele[i].className.replace(/playing/, "");
	}
}
setTimeout(function(){ scrollTo(0,1); }, 100);

// Play audio
        
	function playAudio(src) {
				//var src="http://www.mobvcasting.com/phonegap_workshop/sound_example/funsound.mp3";
			
	            // Create Media object from src
    	        my_media = new Media(src, onSuccess, onError);

        	    // Play audio
            	my_media.play();
        	}
        	
			// onSuccess Callback
	        function onSuccess() {
    	        console.log("playAudio():Audio Success");
        	}

	        // onError Callback 
    	    function onError(error) {
        	    alert('code: '    + error.code    + '\n' + 
            	      'message: ' + error.message + '\n');
	        }            	
