var SelectedItems = [];

$(function() {
	$("#Workspace>div").each(function(){
		this.renderer = Raphael(this,$(this).width(),$(this).height());
	});
	
	// Keep current mouse position accessible from everywhere
	$(document)[0].mousePosition = {};
	$(document).mousemove(function(event) {
        $(document)[0].mousePosition.x = event.pageX;
        $(document)[0].mousePosition.y = event.pageY;
    });

	$("#Elements").tabs();
	$("#Overview").tabs();
	$("#SideBar").droppable({
		drop: function(event, ui) {
			ui.draggable.parent().children().appendTo(ui.draggable.get(0).originalParent);
			if(ui.draggable.hasClass("block") || ui.draggable.hasClass("variable"))
				ui.draggable.remove();
		}
	});
	
	var tabs = $("#Workspace").tabs();
	tabs.find(".ui-tabs-nav").sortable({
		axis: "x",
		stop: function() {
			tabs.tabs("refresh");
		}
	});

	//$("#Workspace").selectable();
	
	// Move the whole workspace
	$("#Workspace").mousedown(function(event){
		var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
		//if(event.target == currentTab) {
			$("#Workspace").get(0).drag = true;
			$("#Workspace").css("cursor","move")
			$("#Workspace").get(0).positionX = event.pageX;
			$("#Workspace").get(0).positionY = event.pageY;
			event.preventDefault();
		//}
	});
	
	$("#Workspace").mouseup(function(event){
		$("#Workspace").get(0).drag = false;
		$("#Workspace").css("cursor","default")
		event.preventDefault();
	});
	
	$("#Workspace").mousemove(function(event){
		if($("#Workspace").get(0).drag == true)
		{			
			var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
			$(currentTab).children().each(function(index,element){
				if($(this).attr("role") != "tab") {
					$(this).css('top', parseInt($(this).css('top'))+(event.pageY-$("#Workspace").get(0).positionY)/currentTab.scale);
					$(this).css('left', parseInt($(this).css('left'))+(event.pageX-$("#Workspace").get(0).positionX)/currentTab.scale);
				}
			});
			$("#Workspace").get(0).positionX = event.pageX;
			$("#Workspace").get(0).positionY = event.pageY;
			event.preventDefault();
		}
	});
	////
	
	FunctionsInit();
	ComponentsInit();
	TemplatesInit();
	
	TabInput["Input-OnCreate"] 	= new Array();
	TabInput["Input-OnCollide"] = new Array();
	TabInput["Input-OnDestroy"] = new Array();
	TabInput["Input-OnUpdate"] 	= new Array();


	$('.portOut').editable(function(value, settings){
		return (value);
	});
	
	
	//Static input values predefined from the engine
	TabInput["Input-OnCreate"] [0] = "Self";
	TabInput["Input-OnCollide"][0] = "Self";
	TabInput["Input-OnDestroy"][0] = "Self";
	TabInput["Input-OnUpdate"] [0] = "Self";
	TabInput["Input-OnCollide"][1] = "Entity";

	$.each(TabInput["Input-OnCreate"], function(){$("<div class=\"portOut\">").html(this).appendTo("#Input-OnCreate")});
	$.each(TabInput["Input-OnCollide"], function(){$("<div class=\"portOut\">").html(this).appendTo("#Input-OnCollide")});
	$.each(TabInput["Input-OnDestroy"], function(){$("<div class=\"portOut\">").html(this).appendTo("#Input-OnDestroy")});
	$.each(TabInput["Input-OnUpdate"], function(){$("<div class=\"portOut\">").html(this).appendTo("#Input-OnUpdate")});
	PortProcessing();
	
	// Zoom functionality
	$("#Workspace>div").each(function(){this.scale = 1;});
	$("#TempArea").get(0).scale = 1;
	$("#Workspace").bind("mousewheel", function(event){
		var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
		var delta = event.originalEvent.wheelDelta;
		if(delta > 0 && currentTab.scale < 1) {
			currentTab.scale += 0.1;
			$("#TempArea").get(0).scale += 0.1;
		}
		else if(delta < 0 && currentTab.scale > 0.1) {
			currentTab.scale -= 0.1;
			$("#TempArea").get(0).scale -= 0.1;
			/*if($(currentTab).width() * currentTab.scale < $("#Workspace").width()) {
				$(currentTab).width(100/currentTab.scale + "%");
				$(currentTab).height(100/currentTab.scale + "%");
			
			}*/
		}
		$(currentTab).css('transform', 'scale('+currentTab.scale+')');
		$("#TempArea").css('transform', 'scale('+$("#TempArea").get(0).scale+')');
		
		event.preventDefault();
	});

	//Changes all the input values of a Tab
	function SetTabInput(TabID, InputArray)
	{
		TabInput[TabID] = InputArray;
	}
	//Function that adds a new Tab and pushes a new array of Inputs to the TabInput array
	function AddTab(TabID, InputArray)
	{
		TabInput[TabID] = InputArray;
	}

	$(".TabInput").attr("title", "")
	.tooltip({
		content: "Incoming parameters"
	});
});

//Selection
var classHighlight = "selected";
var $currentSelected;
var selectFunc = function(event) {
	event.preventDefault();
	if($currentSelected)
		$currentSelected.removeClass(classHighlight);
	$(event.target).addClass(classHighlight);
	$currentSelected = $(event.target);
};
