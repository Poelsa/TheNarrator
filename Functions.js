var FunctionsInit = function() {
	var functions = {};
	functions.NewEntity = {
		tip: "This will create a new entity",
		id : "NewEntity",
		returnvalue : "Entity",
		inVar : [["","Flow","Flow"]],
		outVar : [ "Flow", "Entity" ]
	};

	functions.NewTransformComponent = {
	tip: "defines position and rotation of an entity",
	id : "NewTransformComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"] ],
	outVar : [ "Flow", "TransformComponent" ]
	};
	
	functions.NewCollisionComponent = {
	tip: "Enables a entity to collide",
	id: "NewCollisionComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"] ],
	outVar : [ "Flow", "CollisionComponent" ]
	};
	
	functions.NewPhysicsComponent = {
	tip: "",
	id : "NewPhysicsComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"] ],
	outVar : [ "Flow", "PhysicsComponent" ]
	};
	
	functions.NewScriptComponent = {
	tip: "This will create a new entity",
	id : "NewScriptComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"], ["Empty","ScriptName","String"] ],
	outVar : [ "Flow", "ScriptComponent" ]
	};
	
	functions.CreatePhysicsHandle = {
	tip: "This will create a new entity",
	id: "CreatePhysicsHandle",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"], ["0","Type","int"], ["false","ExternallyControlled","bool"] ],
	outVar : [ "Flow", "int-pointer" ]
	};
	
	functions.BindSphereShape = {
	tip: "This will create a new entity",
	id: "BindSphereShape",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"], ["(1,1,1)","Position","vector3"],  ["(1,1,1,1)","Rotation","quaternion"],
				["1","Radius","float"], ["1","Mass","float"], ["true","CollideWStatic","bool"], ["true","CollideWExternal","bool"] ],
	outVar : [ "Flow" ]
	};
	

	for(var prop in functions) {
		//var tempAreaTest = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]).clone();
		$("<div class='functions'>")
		.html("<span id = " + functions[prop].id + ">"+functions[prop].id+"</span>")
		.appendTo("#Elements-Functions")
		.mousedown(function(e){
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
				var inDiv = $("<div style='float: left; width: 50%;'></div>").appendTo(ui.helper);
				for (var index in $(this)[0].func.inVar)
				{
					var port = $("<div class=\"portIn\" type=\""+$(this)[0].func.inVar[index][2]+"\"><div>" + $(this)[0].func.inVar[index][1] + "<br/><a>" + $(this)[0].func.inVar[index][0] + "</a></div></div>")
					.appendTo(inDiv);
					if($(this)[0].func.inVar[index][2] != "Flow")
						port.children().children().filter("a")
						.editable(function(value, settings){
							return (value);
						},
						{
							event: "dblclick",
							style: "display: inline-block"
						});
				}
				var outDiv = $("<div style='float: right; width: 50%;'></div>").appendTo(ui.helper);
				for (var index in $(this)[0].func.outVar)
				{
					var port = $("<div class=\"portOut\" type=\""+$(this)[0].func.outVar[index]+"\">" + $(this)[0].func.outVar[index] + "</div>")
					.appendTo(outDiv);
				}
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
				{
					var newblock = $("<div class='block ui-widget-content ui-draggable'>").html($(this).html()).appendTo(currentTab).draggable({
						stack: 'div',
						start: function(e){
							$("#TempArea").css("left", $(this).parent().offset().left);
							$("#TempArea").css("top", $(this).parent().offset().top);
							$("#TempArea").css("width", $(this).parent().width());
							$("#TempArea").css("margin", "1px"); // compensate for #Workspace's border
							$(this).get(0).originalParent = $(this).parent();
							$(this).parent().children().appendTo("#TempArea");
						},
						drag: function(e, ui){
							// Keep the line start and end updated while dragging
							UpdatePortLines(this);
						},
						stop: function(e){
							$(this).parent().children().appendTo(currentTab);
							}
					})
					.attr("title","")
					.tooltip({content: $(this)[0].func.tip})
					.css("top", $(this)[0].ui.helper.offset().top - $(currentTab).children().offset().top)
					.css("left", $(this)[0].ui.helper.offset().left - $(currentTab).children().offset().left)
					.css("cursor","pointer")
					.click(selectFunc)
					.mousedown(function(e){e.stopPropagation();});
					
					newblock.append("<br class=\"clear\">");
					var inDiv = $("<div style='float: left;'></div>").appendTo(newblock);
					for (var index in $(this)[0].func.inVar)
					{
						var port = $("<div class=\"portIn\" type=\""+$(this)[0].func.inVar[index][2]+"\"><div>" + $(this)[0].func.inVar[index][1] + "<br/><a>" + $(this)[0].func.inVar[index][0] + "</a></div></div>")
						.appendTo(inDiv);
						if($(this)[0].func.inVar[index][2] != "Flow")
							port.children().children().filter("a")
							.editable(function(value, settings){
								return (value);
							},
							{
								event: "dblclick",
								style: "display: inline-block"
							});
					}
					var outDiv = $("<div style='float: right;'></div>").appendTo(newblock);
					for (var index in $(this)[0].func.outVar)
					{
						var port = $("<div class=\"portOut\" type=\""+$(this)[0].func.outVar[index]+"\">" + $(this)[0].func.outVar[index] + "</div>")
						.appendTo(outDiv);
						PortFunctionality(port);
					}
				}
				
				$(this).parent().children().appendTo($(this).get(0).originalParent);

				return true; // revert
			},
			stack: "div",
			helper: "clone",
			revertDuration: 0,
			cursorAt: {left: 0, top: 60}
		}).hover().css("cursor", "pointer")
		.get(0).func = functions[prop];
	}
};
