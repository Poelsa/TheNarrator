var LogicInit = function() {
	var Logics = {};
	Logics.IfStatement = {
		tip : "This is an if-statement",
		id : "IfStatement",
		inVar : [["","Flow", "Flow"], ["value","ComparisonValue1", ""],["value","ComparisonValue2", ""],["type","ComparisonType", ""]],
		outVar : [[ "true", "Flow" ],["false", "Flow"]]
	};
	Logics.WhileStatement = {
		tip : "This is a while-looping loop",
		id : "WhileStatement",
		inVar : [["","Flow", "Flow"], ["value","ComparisonValue1", ""],["value","ComparisonValue2", ""],["type","ComparisonType", ""]],
		outVar : [[ "End", "Flow" ], ["loop", "Flow"]]
	};
	Logics.Operator = {
		tip : "This is an operator for operating sick peaple",
		id : "Operator",
		inVar : [["","Flow", "Flow"], ["value","ComparisonValue1", ""],["value","ComparisonValue2", ""],["type","ComparisonType", ""]],
		outVar : [[ "Flow", "Flow" ],["result", "Flow"]]
	};
	for(var prop in Logics) {		
		$("<div class='Logics'>").html(Logics[prop].id).appendTo("#Elements-Logic").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("logic");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
				{
					var newblock = $("<div class='logic ui-widget-content ui-draggable'>").html($(this).html()).appendTo(currentTab).draggable({
						stack: 'div',
						start: function(e){
							//$(".TabInput").css("top", $(this).parent().parent().offset().top);
							//$(".TabInput").css("left", $(this).parent().parent().offset().left);
							$(".TabInput").css("margin", "1px");
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
					.tooltip({content: $(this)[0].logic.tip})
					.css("top", $(this)[0].ui.helper.offset().top - $(currentTab).offset().top)
					.css("left", $(this)[0].ui.helper.offset().left - $(currentTab).offset().left)
					.hover().css("cursor","pointer")
					.click(selectFunc)
					.mousedown(function(e){e.stopPropagation();});
				
					newblock.append("<br class=\"clear\">");
					var inDiv = $("<div style='float: left;'></div>").appendTo(newblock);
					for (var index in $(this)[0].logic.inVar)
					{
						//var port = $("<div class=\"portIn\" type=\""+$(this)[0].logic.inVar[index][2]+"\"><div>" + $(this)[0].logic.inVar[index][1] + "<br/><a>" + $(this)[0].logic.inVar[index][0] + "</a></div></div>")
						var port = $("<nobr class=\"portIn\" type=\""+$(this)[0].logic.inVar[index][2]+"\"><span>" + $(this)[0].logic.inVar[index][1] + "<br/>" + ($(this)[0].logic.inVar[index][0]!=""?"<a>" + $(this)[0].logic.inVar[index][0] + "</a>":"") + "</span></nobr>")
						.appendTo(inDiv);
						if($(this)[0].logic.inVar[index][2] != "Flow")
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
					for (var index in $(this)[0].logic.outVar)
					{
						var port = $("<nobr class=\"portOut\" type=\""+$(this)[0].logic.outVar[index][1]+"\">" + $(this)[0].logic.outVar[index][0] + "</nobr>")
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
		.get(0).logic = Logics[prop]
	}
};