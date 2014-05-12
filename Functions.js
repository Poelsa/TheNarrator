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
				// Keep the line start and end updated while dragging
				var workspace = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]);
				$(this).children().filter(".portIn").each(function(){
					if($(this)[0].line)
						$(this)[0].line.Update($(this)[0].line.from,
							{x: $(this).offset().left + 6 - workspace.offset().left,
							y: $(this).offset().top + $(this).height()/2 - workspace.offset().top});
				});
				$(this).children().filter(".portOut").each(function(){
					if($(this)[0].line)
						$(this)[0].line.Update(
							{x: $(this).offset().left + $(this).width() + 6 - workspace.offset().left,
							y: $(this).offset().top + $(this).height()/2 - workspace.offset().top},
							$(this)[0].line.to);
				});
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

/* This code should be called when creating a new block which has in and out ports

	$(".portIn, .portOut").bind('mousedown', false);
	$(".portOut").mousedown(function(e){
		//alert("mousedown");
	});
	$(".portOut").draggable({
		start: function(e, ui){
			$(this)[0].line = new Line("red");
			ui.helper.html("");
			ui.helper.css("margin", "0");
			ui.helper.css("padding", "0");
			ui.helper.css("visibility", "hidden");
		},
		drag: function(e, ui){
			var workspace = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]);
			$(this)[0].line.Update(
				{x: $(this).offset().left + $(this).width() + 6 - workspace.offset().left,
				y: $(this).offset().top + $(this).height()/2 - workspace.offset().top},
				{x: ui.helper.offset().left + 6 - workspace.offset().left,
				y: ui.helper.offset().top + 6 - workspace.offset().top});
		},
		stop: function(e, ui){
			var isAttached = false;
			
			// Snap event processing:
			var draggable = $(this);
			$.each(draggable.data("ui-draggable").snapElements, function(index, element) {
				if(!isAttached && element.snapping)
				{
					$(element.item)[0].line = draggable[0].line;
					isAttached = true;
				}
				else if(!element.snapping && $(element.item)[0].line == draggable[0].line)
					$(element.item)[0].line = null;
			});
			
			if(!isAttached)
				$(this)[0].line.Remove();
		},
		helper: "clone",
		revert: true,
		revertDuration: 0,
		cursorAt: {left: 6, top: 6},
		snap: ".portIn",
		snapMode: "inner",
		snapTolerance: 6
	});
*/
