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


	for(var prop in functions)
		$("<div class='functions'>").html(functions[prop].id).appendTo("#Elements-Functions").click(function(e){
			$("<div class='block ui-widget-content ui-draggable'>").html($(this).html()).appendTo("#Workspace-OnCreate");
		});
});