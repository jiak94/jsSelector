var g_Interval = 1;
var restaurants = [];
var addresses = [];
var g_Timer;
var running = false;
var restaurant_num;
$(document).ready(function() {
	restaurant_num = DATA["restaurants"].length;
	for (var i = 0; i < restaurant_num; i++) {
		restaurants[i] = DATA["restaurants"][i]["name"];
		addresses[i] = DATA["restaurants"][i]["address"];
	}
})
function beginRndNum(trigger){
	if(running){
		running = false;
		clearTimeout(g_Timer);
		$(trigger).val("Start");
		$('#ResultNum').css('color','red');
		//update the json here
	}
	else{
		running = true;
		$('#ResultNum').css('color','black');
		$(trigger).val("Stop");
		beginTimer();
	}
}

function updateRndNum(){
	var index = Math.floor(Math.random()*restaurant_num);
	var result = restaurants[index];
	var destination = addresses[index];
	$('#ResultNum').html(result);
	$('#Address').html(destination);
}

function beginTimer(){
	g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
	g_Timer = setTimeout(beat, g_Interval);
	updateRndNum();
}
