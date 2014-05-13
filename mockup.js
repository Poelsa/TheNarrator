var Variables = ["Transform"];
var Functions = [["Function"], ["Another function"]];
var Macros = [["Macro"], ["Another macro"]];
var Templates = [["Template"], ["Another template"]];

var TabInput = new Object();

var SelectedItems = [];

TabInput["Input-OnCreate"] = new Array();
TabInput["Input-OnCollide"] = new Array();
TabInput["Input-OnDestroy"] = new Array();
TabInput["Input-OnUpdate"] = new Array();

//Static input values predefined from the engine
TabInput["Input-OnCreate"][0] = "Self";
TabInput["Input-OnCollide"][0] = "Self";
TabInput["Input-OnDestroy"][0] = "Self";
TabInput["Input-OnUpdate"][0] = "Self";
TabInput["Input-OnCollide"][1] = "Entity";


$(function() {
	// Initialize SVG drawing area
	$("#Workspace>div").each(function(){
		this.renderer = Raphael(this,$(this).width(),$(this).height());
		/*var line = new Line("#999999", this.renderer);
		line.Update({x: 50, y: 100}, {x: 290, y: 500});*/
	});

	// Keep current mouse position accessible from everywhere
	$(document)[0].mousePosition = {};
	$(document).mousemove(function(event) {
        $(document)[0].mousePosition.x = event.pageX;
        $(document)[0].mousePosition.y = event.pageY;
    });
	
	// Initialize jQuery UI elements
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
		$("#Workspace").get(0).drag = true;
		$("#Workspace").get(0).positionX = event.pageX;
		$("#Workspace").get(0).positionY = event.pageY;
		event.preventDefault();
	});
	
	$("#Workspace").mouseup(function(event){
		$("#Workspace").get(0).drag = false;
		event.preventDefault();
	});
	
	$("#Workspace").mousemove(function(event){
		if($("#Workspace").get(0).drag == true)
		{
			$("#Workspace").children().each(function(index,element){
				$(this).css('top', parseInt($(this).css('top'))+event.pageY-$("#Workspace").get(0).positionY);
				$(this).css('left', parseInt($(this).css('left'))+event.pageX-$("#Workspace").get(0).positionX);
			});
			$("#Workspace").get(0).positionX = event.pageX;
			$("#Workspace").get(0).positionY = event.pageY;
			event.preventDefault();
		}
	});
	////
	
	FunctionsInit();
	ComponentsInit();
	

	//Click function for TabInput boxes
	//$(".TabInput").click(function() {
	//	alert(TabInput[$(this).attr('id')][0]); //Test, remove once done
	//	//TODO: få fram pop-up av input property sheet där man kan definiera input
	//});

	$('.TabInput').editable(function(value, settings){
		return (value);
	},
	{
	});
	
	
	/*
	// Zoom functionality
	$("#Workspace").get(0).scale = 1;
	$("#Workspace>div").bind("mousewheel", function(event){
		var delta = event.originalEvent.wheelDelta;
		if(delta > 0)
			$("#Workspace").get(0).scale *= 1.1;
		else if(delta < 0)
			$("#Workspace").get(0).scale /= 1.1;
		$(this).css('transform', 'scale('+$("#Workspace").get(0).scale+')');
		event.preventDefault();
	});*/

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
});

//Trying to get selection to work
var classHighlight = "selected";
var $currentSelected;
var selectFunc = function(event) {
	event.preventDefault();
	if($currentSelected)
		$currentSelected.removeClass(classHighlight);
	$(event.target).addClass(classHighlight);
	$currentSelected = $(event.target);
};
