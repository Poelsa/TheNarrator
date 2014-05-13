var FunctionsInit = function() {
	var functions = {};
	functions.NewEntity = {
	id : "NewEntity",
	inVar : [],
	outVar : [ "Entity" ]
	};

	functions.NewTransformComponent = {
	id : "NewTransformComponent",
	inVar : [ "Entity" ],
	OutVar : [ "TransformComponent" ]
	};
	
	functions.NewCollisionComponent = {
	id: "NewCollisionComponent",
	inVar : [ "Entity" ],
	outVar : [ "CollisionComponent" ]
	};
	
	functions.NewPhysicsComponent = {
	id : "NewPhysicsComponent",
	inVar : [ "Entity" ],
	outVar : ["PhysicsComponent" ]
	};
	
	functions.NewScriptComponent = {
	id : "NewScriptComponent",
	inVar : [ "Entity", "String" ],
	outVar : ["ScriptComponent" ]
	};
	
	functions.CreatePhysicsHandle = {
	id: "CreatePhysicsHandle",
	accessor: "CollisionComponent",
	inVar : [ "Entity", "int", "bool" ],
	outVar : [ "int-pointer" ]
	};
	
	functions.BindSphereShape = {
	id: "BindSphereShape",
	accessor: "PhysicsComponent",
	inVar : [ "CollisionComponent", "vector3",  "quarternion",
				"float", "float", "bool", "bool" ],
	outVar : []
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
				ui.helper.html(this.func.id);
				ui.helper.addClass("block");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
        ui.helper.append("<br class=\"clear\">");
				for (var index in $(this)[0].func.inVar)
				{
					ui.helper.append("<div class=\"portIn\">" + $(this)[0].func.inVar[index] + "</div>");
				}
				for (var index in $(this)[0].func.outVar)
				{
					ui.helper.append("<div class=\"portOut\">" + $(this)[0].func.outVar[index] + "</div>");
				}
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
				{
					var newblock = $("<div class='block ui-widget-content ui-draggable'>").html($(this).html()).appendTo(currentTab).draggable({
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
					
          newblock.append("<br class=\"clear\">");
					for (var index in $(this)[0].func.inVar)
					{
						newblock.append("<div class=\"portIn\">" + $(this)[0].func.inVar[index] + "</div>");
					}
					for (var index in $(this)[0].func.outVar)
					{
						newblock.append("<div class=\"portOut\">" + $(this)[0].func.outVar[index] + "</div>").editable(function(value, settings){
              return (value);
            },
            {
            });
					}
				}
				
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")[0].func = functions[prop];		
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
