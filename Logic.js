var LogicInit = function() {
	var Logics = {};
	Logics.IfStatement = {
		tip : "This is an if-statement",
		id : "IfStatement",
		inVar : [["","Flow", "Flow"], ["value","Value1", "any"],["value","Value2", "any"],[["==", "!=", "<", "<=", ">", ">=", "in"],"ComparisonType", ""]],
		outVar : [[ "true", "Flow" ],["false", "Flow"]]
	};
	Logics.WhileStatement = {
		tip : "This is a while-looping loop",
		id : "WhileStatement",
		inVar : [["","Flow", "Flow"], ["value","Value1", "any"],["value","Value2", "any"],[["==", "!=", "<", "<=", ">", ">=", "in"],"ComparisonType", ""]],
		outVar : [[ "End", "Flow" ], ["loop", "Flow"]]
	};
	Logics.Operator = {
		tip : "This is an operator for operating sick peeapple",
		id : "Operator",
		inVar : [["","Flow", "Flow"], ["value","Value1", "any"],["value","Value2", "any"],[["+", "-", "*", "/", "%"],"ComparisonType", ""]],
		outVar : [[ "Flow", "Flow" ],["success", "bool"]]

	};
	
	Logics.FlowConnector = {
		tip : "Ties together two seperate flows",
		id	: "Flow-connector",
		inVar	: [["","Flow", "Flow"], ["","Flow", "Flow"]],
		outVar	: [["Flow", "Flow"]]
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
				ui.helper.html(this.logic.id);
				ui.helper.addClass("logic");
				ui.helper.addClass("ui-widget-content");
				ui.helper.removeClass("Logics");
				ui.helper.removeClass("ui-draggable-dragging");
				$(this).get(0).originalParent = $(this).parent();
				ui.helper.appendTo("#TempArea");
				CreatePorts($(this)[0].logic, ui.helper);
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					CreateBlock(this, $(this)[0].logic, $("<div class='logic ui-widget-content ui-draggable'>"));
				
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				
				return true; // revert
			},
			stack: "div",
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")
		.get(0).logic = Logics[prop]
	}
};