var g_Interval = 1;
var g_Timer;
var running = false;
var results;
var auth = {
        consumerKey: "HXCumKrNMMFm_xJvw2JjLA",
        consumerSecret: "4RNJ3VXa4arGtJ4sTpjXc3p6rCQ",
        accessToken: "UlGH4NfYTPHelrokRli5L4aCqMg-lvkX",
        accessTokenSecret: "YbVcK46u64VMUMqMpZpLsgpnJHM",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
};

var terms = "restaurant";
var near = "Athens, GA";
var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};
$(document).ready(function() {
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['limits', 30]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
    var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
    //console.log(parameterMap);
    
    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'cache' : true,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
            //console.log(data);
	    //callback(data);
	    	results = data;
        }
    });

    console.log(results);
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
	var index = Math.floor(Math.random()*results['businesses'].length);
	var business = results['businesses'][index];
	var name = business['name'];
	var destination = getAddress(business['location']['display_address']);
	//console.log(destination);
	var category = getCategory(business['categories']);
	//console.log(category);
	$('#ResultNum').html(name);
	$('#Address').html(destination);
	$('#Categories').html(category);
}

function beginTimer(){
	g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
	g_Timer = setTimeout(beat, g_Interval);
	updateRndNum();
}

function getAddress(addressblock) {
	var parse = "";
	for (var i = 0; i < addressblock.length; i++) {
		parse += addressblock[i] + ", ";
	}

	return parse;
}

function getCategory(categoryBlock) {
	var parse = "";

	for (var i = 0; i < categoryBlock.length; i++) {
		parse += categoryBlock[i][0] + ", ";
	}

	return parse;
}
