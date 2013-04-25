var memoArea = document.getElementsByTagName("textarea");

for(var i=0; i<memoArea.length; i++){
	memoArea[i].value = localStorage.getItem("memo"+i);
}

window.addEventListener("unload", saveData, true);
document.getElementById("saveButton").addEventListener("click", saveData, true);

function saveData(){
	for(var i=0; i<memoArea.length; i++){
		try{
			localStorage.setItem("memo"+i, memoArea[i].value);
		}catch(e){
			alert("it si too much word, please delet some.");
			return;
		}
	}
	alert("save it");
}
setTimeout(function(){ scrollTo(0,1); }, 100);
