var FunctionsInit = function() {
	var functions = {};
	functions.NewEntity = {
		tip: "This will create a new entity",
		id : "NewEntity",
		inVar : [["","Flow","Flow"]],
		outVar : [ ["Flow","Flow"], ["Entity","Entity"] ]
	};
	functions.NewRenderableComponent = {
	tip	: "Defines material and certain techniques for rendering an entity",
	id	: "NewRenderableComponent",
	inVar	:	[["","Flow","Flow"],["New","Entity","Entity"]],
	outVar	:	[["Flow", "Flow"]]
	};
	functions.NewTransformComponent = {
	tip: "Defines position and rotation of an entity",
	id : "NewTransformComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"] ],
	outVar : [ ["Flow","Flow"]]
	};
	
	functions.NewCollisionComponent = {
	tip: "Enables a entity to collide",
	id: "NewCollisionComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"] ],
	outVar : [ ["Flow","Flow"]]
	};
	
	functions.NewPhysicsComponent = {
	tip: "Required for physical behavior",
	id : "NewPhysicsComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"] ],
	outVar : [ ["Flow","Flow"]]
	};
	
	functions.NewScriptComponent = {
	tip: "Attaches a seperate script-file to the entity",
	id : "NewScriptComponent",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"], ["Empty","ScriptName","String"] ],
	outVar : [ ["Flow","Flow"]]
	};
	
	functions.CreatePhysicsHandle = {
	tip: "int-pointer that is used to access the physics of an entity",
	id: "CreatePhysicsHandle",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"], ["0","Type","int"], ["false","ExternallyControlled","bool"] ],
	outVar : [ ["Flow","Flow"] ]
	};
	
	functions.BindSphereShape = {
	tip: "Physics shape for non-static objects",
	id: "BindSphereShape",
	inVar : [ ["","Flow","Flow"],["New","Entity","Entity"], ["(1,1,1)","Position","vector3"],  ["(1,1,1,1)","Rotation","quaternion"],
				["1","Radius","float"], ["1","Mass","float"], ["true","CollideWStatic","bool"], ["true","CollideWExternal","bool"] ],
	outVar : [ ["Flow","Flow"] ]
	};
	

	for(var prop in functions) {
		//var tempAreaTest = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]).clone();
		$("<div class='functions'>")
		.html("<span class =\"title\" id = " + functions[prop].id + ">"+functions[prop].id+"</span>")
		.appendTo("#Elements-Functions")
		.attr("title","")
		.tooltip({content: functions[prop].tip, show:{delay: 2000}})
		.mousedown(function(e){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", "100%");
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.html(this.func.id);
				ui.helper.addClass("block");
				ui.helper.addClass("ui-widget-content");
				ui.helper.removeClass("functions");
				ui.helper.removeClass("ui-draggable-dragging");
				$(this).get(0).originalParent = $(this).parent();
				ui.helper.appendTo("#TempArea");
				CreatePorts($(this)[0].func, ui.helper);
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					CreateBlock(this, $(this)[0].func, $("<div class='block ui-widget-content ui-draggable'>"));
				
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

function CreateBlock(html, obj, block)
{
	var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
	
	var newblock = block.html("<span class=\"title\">"+obj.id+"</div>").appendTo(currentTab).draggable({
		stack: 'div',
		start: function(e){
			$("#TempArea").css("left", $(this).parent().offset().left); //Here be wrong stuff
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("z-index", "9999");
			//$("#TempArea").css("margin", "1px"); // compensate for #Workspace's border
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
	.tooltip({content: obj.tip, show:{delay: 2000}})
	.css("top", $(html)[0].ui.helper.offset().top - $(currentTab).children().offset().top)
	.css("left", $(html)[0].ui.helper.offset().left - $(currentTab).children().offset().left)
	.css("cursor","pointer")
	.click(selectFunc)
	.mousedown(function(e){e.stopPropagation();});

	CreatePorts(obj, newblock);
	
	return newblock;
}

function CreatePorts(obj, block)
{
	block.append("<br class=\"clear\">");
	var inDiv = $("<div style='float: left;'></div>").appendTo(block);
	for (var index in obj.inVar)
	{
		var port = $("<nobr class=\"portIn\" type=\""+obj.inVar[index][2]+"\"><span>" + obj.inVar[index][1] + "</span></nobr>")
		.appendTo(inDiv);
		if(obj.inVar[index][2] != "Flow")
			port.children().children().filter("a")
		if(typeof(obj.inVar[index][0]) == "string")
			$(obj.inVar[index][0]!=""?"<br/><a>" + obj.inVar[index][0] + "</a>":"")
			.appendTo(port.children())
			.editable(function(value, settings){
				return (value);
			},
			{
				cssclass: "editable",
				event: "dblclick",
				style: "display: inline-block; margin: 0;"
			});
		else
		{
			port.children().append("<br/>");
			var dropdown = $("<select style=\"width: 100%;\">").appendTo(port.children());
			for(var i in obj.inVar[index][0])
				dropdown.append("<option>"+obj.inVar[index][0][i]+"</option>");
		}
	}
	var outDiv = $("<div style='float: right;'></div>").appendTo(block);
	for (var index in obj.outVar)
	{
		var port = $("<nobr class=\"portOut\" type=\""+obj.outVar[index][1]+"\">" + obj.outVar[index][0] + "</nobr>")
		.appendTo(outDiv);
		PortFunctionality(port);
	}
}
