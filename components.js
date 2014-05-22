var ComponentsInit = function() {
	var components = {};

	components.Entity = {
	tip : "This is not the entity you are looking for",
	id : "Entity",
	inVar : [],
	outVar : [["Entity","Entity"]]
	};

	components.Transform = {
		id 		: "Tranform",
		inVar : [["(1,1,1)","Position", "vector3"], ["(1,1,1)","Scale", "vector3"]],
		outVar : [["Position", "vector3"],["Scale", "vector3"]]
	};

	components.Renderable = {
		id 				: "Renderable",
		inVar			: [["cube","Model", "String"],["cube_material","Material", "String"],["0","Shadow Technique", "int"],
							["cube_diffuse","Material Diffuse", "String"],["cube_specular","Material Specular", "String"],["cube_normal","Material Normal", "String"],
							["cube_glow","Material Glow", "String"],["cube_effect","Material Effect", "String"]],
		outVar			: [["Model", "String"],["Material", "String"],["Shadow Technique", "int"],
							["Material Diffuse", "String"],["Material Specular", "String"],["Material Normal", "String"],
							["Material Glow", "String"],["Material Effect", "String"]]
	};

	components.Particle = {
		id 		: "Particle",
		inVar 	: [["New","Entity","Entity"],["cube_emitter","Particle Emitter", "String"]],
		outVar	: [["Particle Emitter", "String"]]
	};

	components.Collision = {
		id 		: "Collision",
		inVar	: [["New","Entity","Entity"],["0","Type", "int"],["false","ExternallyControlled", "bool"]],
		outVar	: [["Type", "int"],["ExternallyControlled", "bool"]]
	};

	for(var prop in components) {		
		$("<div class='components'>").html(components[prop].id).appendTo("#Elements-Variables").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("variable");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
				{
					var newblock = $("<div class='variable ui-widget-content ui-draggable'>").html($(this).html()).appendTo(currentTab).draggable({
						stack: 'div',
						start: function(e){
							//$(".TabInput").css("top", $(this).parent().parent().offset().top);
							//$(".TabInput").css("left", $(this).parent().parent().offset().left);
							$(".TabInput").css("margin", "1px");
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
					})
					.attr("title","")
					.tooltip({content: $(this)[0].component.tip})
					.css("top", $(this)[0].ui.helper.offset().top - $(currentTab).offset().top)
					.css("left", $(this)[0].ui.helper.offset().left - $(currentTab).offset().left)
					.hover().css("cursor","pointer")
					.click(selectFunc)
					.mousedown(function(e){e.stopPropagation();});
				
					newblock.append("<br class=\"clear\">");
					var inDiv = $("<div style='float: left;'></div>").appendTo(newblock);
					for (var index in $(this)[0].component.inVar)
					{
						var port = $("<div class=\"portIn\" type=\""+$(this)[0].component.inVar[index][2]+"\"><div>" + $(this)[0].component.inVar[index][1] + "<br/><a>" + $(this)[0].component.inVar[index][0] + "</a></div></div>")
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
					for (var index in $(this)[0].component.outVar)
					{
						var port = $("<div class=\"portOut\" type=\""+$(this)[0].component.outVar[index][1]+"\">" + $(this)[0].component.outVar[index][0] + "</div>")
						.appendTo(outDiv);
						PortFunctionality(port);
					}
					
					$(this).parent().children().appendTo($(this).get(0).originalParent);
				}
					
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")
		.get(0).component = components[prop]
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