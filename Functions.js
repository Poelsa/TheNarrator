$(function() {



var functions = {};
functions.NewEntity = {
id : "NewEntity",
returnvalue : "Entity"
};

functions.NewTransform = {
id : "NewTransform",
invalue1 : "Entity",
returnvalue : "TransformComp"

};


for(var prop in functions) {	
	$("<div class='Functions ui-widget-content ui-draggable'>").html(functions[prop].id).appendTo("#Elements-Functions");	
};

});