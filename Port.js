function PortProcessing()
{
	// Prevent propagation, thus cancelling the block drag when starting from a portIn or portOut
	$(".portIn, .portOut").bind('mousedown', false);
	$(".portOut").each(function(){
		$(this)[0].line = [];
	});
	PortFunctionality($(".portOut"));
};
function PortFunctionality(p_ports)
{
	p_ports.each(function(){
		$(this)[0].line = [];
		$(this).draggable({
			start: function(e, ui){
				$(this)[0].line.push(new Line(checkColor($(this).attr("type"))));
				ui.helper.html("");
				ui.helper.css("margin", "0");
				ui.helper.css("padding", "0");
				ui.helper.css("visibility", "hidden");
			},
			drag: function(e, ui){
				var workspace = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]);
				this.line[this.line.length-1].Update(
					{x: $(this).offset().left + $(this).width() + 6 - workspace.offset().left,
					y: $(this).offset().top + $(this).height()/2 - workspace.offset().top + 3},
					{x: ui.helper.offset().left + 6 - workspace.offset().left,
					y: ui.helper.offset().top + 6 - workspace.offset().top});
				$(this)[0].helperoffset = ui.helper.offset();
			},
			stop: function(e, ui){
				// Snap event processing:
				var draggable = $(this);
				var distance2 = 999999;
				var nearest = null;
				$.each(draggable.data("ui-draggable").snapElements, function(index, element) {
					var dist2 = Math.pow($(element.item).offset().top - draggable[0].helperoffset.top, 2) + Math.pow($(element.item).offset().left - draggable[0].helperoffset.left, 2)
					if(dist2 < distance2)
					{
						distance2 = dist2;
						nearest = $(element.item);
					}
				});
				if(distance2 < 256)
				{
					if(nearest[0].line)
						nearest[0].line.Remove();
					nearest[0].line = draggable[0].line[draggable[0].line.length-1];
					var workspace = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]);
					nearest[0].line.Update(nearest[0].line.from,
						{x: nearest.offset().left + 6 - workspace.offset().left,
						y: nearest.offset().top + nearest.height()/2 - workspace.offset().top});
				}
				else
					draggable[0].line[draggable[0].line.length-1].Remove();
			},
			helper: "clone",
			revert: true,
			revertDuration: 0,
			cursorAt: {left: 6, top: 6},
			snap: '.portIn[type="'+$(this).attr("type")+'"]' + ($(this).attr("type")=='Flow'?'':', .portIn[type=any]'),
			snapMode: "inner",
			snapTolerance: 8
		});
	});
};

function checkColor(varType)
{
	switch(varType.toUpperCase())
	{
	case "FLOW":
			return "Gray";
	case "ENTITY":
		return "OrangeRed";
	case "VECTOR3":
		return "OliveDrab";
	case "INT":
		return "DodgerBlue";
	case "STRING":
		return "Khaki";
	case "QUATERNION":
		return "MediumSpringGreen";
	case "BOOL":
		return "#FFFFFA";
	case "FLOAT":
		return "DarkSalmon";
	case "TRANSFORMCOMPONENT":
		return "LightSteelBlue";
	case "COLLISIONCOMPONENT":
		return "Orange";
	case "PHYSICSCOMPONENT":
		return "Sienna";
	case "SCRIPTCOMPONENT":
		return "DarkRed";
	case "INT-POINTER":
		return "Fuchsia";
	}
}
