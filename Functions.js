var FunctionsInit = function() {
	var functions = {};
	functions.NewEntity = {
	id : "NewEntity",
	returnvalue : "Entity"
	};

	functions.NewTransformComponent = {
	id : "NewTransformComponent",
	invalue1 : "Entity",
	returnvalue : "TransformComponent"

	};
	
	functions.NewCollisionComponent = {
	id: "NewCollisionComponent",
	invalue1 : "Entity",
	returnvalue : "CollisionComponent"
	};
	
	functions.NewPhysicsComponent = {
	id : "NewPhysicsComponent",
	invalue1 : "Entity",
	returnvalue : "PhysicsComponent"
	};
	
	functions.NewScriptComponent = {
	id : "NewScriptComponent",
	invalue1: "Entity",
	invalue2: "String",
	returnvalue : "ScriptComponent"
	};
	
	functions.CreatePhysicsHandle = {
	id: "CreatePhysicsHandle",
	accessor: "CollisionComponent",
	invalue1: "Entity",
	invalue2: "int",  //Type
	invalue3: "bool", //Externally controlled
	returnvalue: "int-pointer"
	};
	
	functions.BindSphereShape = {
	id: "BindSphereShape",
	accessor: "PhysicsComponent",
	invalue1: "CollisionComponent",
	invalue2: "vector3", //Position
	invalue3: "quarternion", //Rotation
	invalue4: "float", //radius
	invalue5: "float", //mass
	invalue6: "bool", //no spelare eller no world, kolla i fysiken i no remember
	invalue7: "bool" //Den som inte den ovan �r.
	};
	
	functions.IfStatement = {
	id: "If-statement",
	conditions: []
	};
	
	for(var prop in functions)
		$("<div class='functions'>").html(functions[prop].id).appendTo("#Elements-Functions").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("block");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					$("<div class='block ui-widget-content ui-draggable'>").html($(this).html()).appendTo(currentTab).draggable({
						stack: 'div',
						start: function(e){
							$("#TempArea").css("left", $(this).parent().parent().offset().left);
							$("#TempArea").css("top", $(this).parent().parent().offset().top);
							$("#TempArea").css("width", $(this).parent().parent().width());
							$("#TempArea").css("margin", "1px"); // compensate for #Workspace's border
							$(this).get(0).originalParent = $(this).parent();
							$(this).parent().children().appendTo("#TempArea");
							},
						stop: function(e){
							$(this).parent().children().appendTo(currentTab);
							}
					}).tooltip({ hide: { effect: "explode", duration: 1000 } })
					.css("top", $(this)[0].ui.helper.offset().top - $(currentTab).offset().top)
					.css("left", $(this)[0].ui.helper.offset().left - $(currentTab).offset().left)
					.css("cursor","pointer")
					.click(selectFunc);
				
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer");
};