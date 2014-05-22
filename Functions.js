var FunctionsInit = function() {
	var functions = {};
	functions.NewEntity = {
		tip: "This will create a new entity",
		id : "NewEntity",
		returnvalue : "Entity",
		inVar : [],
		outVar : [ "Entity" ]
	};

	functions.NewTransformComponent = {
	tip: "defines position and rotation of an entity",
	id : "NewTransformComponent",
	inVar : [ ["New","Entity","Entity"] ],
	OutVar : [ "TransformComponent" ]
	};
	
	functions.NewCollisionComponent = {
	tip: "Enables a entity to collide",
	id: "NewCollisionComponent",
	inVar : [ ["New","Entity","Entity"] ],
	outVar : [ "CollisionComponent" ]
	};
	
	functions.NewPhysicsComponent = {
	tip: "",
	id : "NewPhysicsComponent",
	inVar : [ ["New","Entity","Entity"] ],
	outVar : ["PhysicsComponent" ]
	};
	
	functions.NewScriptComponent = {
	tip: "This will create a new entity",
	id : "NewScriptComponent",
	inVar : [ ["New","Entity","Entity"], ["Empty","ScriptName","String"] ],
	outVar : ["ScriptComponent" ]
	};
	
	functions.CreatePhysicsHandle = {
	tip: "This will create a new entity",
	id: "CreatePhysicsHandle",
	inVar : [ ["New","Entity","Entity"], ["0","Type","int"], ["false","ExternallyControlled","bool"] ],
	outVar : [ "int-pointer" ]
	};
	
	functions.BindSphereShape = {
	tip: "This will create a new entity",
	id: "BindSphereShape",
	inVar : [ ["New","Entity","Entity"], ["(1,1,1)","Position","vector3"],  ["(1,1,1,1)","Rotation","quaternion"],
				["1","Radius","float"], ["1","Mass","float"], ["true","CollideWStatic","bool"], ["true","CollideWExternal","bool"] ],
	outVar : []
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
				for (var index in $(this)[0].func.inVar)
				{
					ui.helper.append("<div class=\"portIn\" type=\""+$(this)[0].func.inVar[index][2]+"\">" + $(this)[0].func.inVar[index][1] + "<br/><a>" + $(this)[0].func.inVar[index][0] + "</a></div>");
				}
				for (var index in $(this)[0].func.outVar)
				{
					ui.helper.append("<div class=\"portOut\" type=\""+$(this)[0].func.outVar[index]+"\">" + $(this)[0].func.outVar[index] + "</div>");
				}
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
			helper: "clone",
			revertDuration: 0,
			cursorAt: {left: 0, top: 60}
		}).hover().css("cursor", "pointer")
		.get(0).func = functions[prop];
	}
};

function checkColor(varType)
{
	if(varType == "Entity")
		return "OrangeRed";
	else if(varType == "vector3")
		return "OliveDrab";
	else if(varType == "int")
		return "MidnightBlue";
	else if(varType == "string")
		return "Khaki";
	else if(varType == "quaternion")
		return "MediumSpringGreen";
	else if(varType == "bool")
		return "NavajoWhite";
	else if(varType == "float")
		return "DarkSalmon";
	else if(varType == "TransformComponent")
		return "LightSteelBlue";
	else if(varType == "CollisionComponent")
		return "Lime";
	else if(varType == "PhysicsComponent")
		return "Sienna";
	else if(varType == "ScriptComponent")
		return "Tomato";
	else if(varType == "int-pointer")
		return "Fuchsia";
}
