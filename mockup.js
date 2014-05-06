var Variables = ["Transform"];
var Functions = [["Function"], ["Another function"]];
var Macros = [["Macro"], ["Another macro"]];
var Templates = [["Template"], ["Another template"]];

var TabInput = new Object();

TabInput["Input-OnCreate"] = new Array();
TabInput["Input-OnCollide"] = new Array();
TabInput["Input-OnDestroy"] = new Array();
TabInput["Input-OnUpdate"] = new Array();

//Test variables, remove once done
TabInput["Input-OnCreate"][0] = "Entity";
TabInput["Input-OnCollide"][0] = "Collide";
TabInput["Input-OnDestroy"][0] = "Destroy";
TabInput["Input-OnUpdate"][0] = "Update";


$(function() {
	$("#Elements").tabs();
	$("#SideBar").droppable({
		drop: function(event, ui) {
			if(ui.draggable.hasClass("block"))
				ui.draggable.remove();
		}
	});
	$(".block").draggable({
		stack: 'div',
		start: function(e){$(this).get(0).originalParent = $(this).parent(); $(this).parent().children().appendTo("#TempArea");},
		stop: function(e){$(this).parent().children().appendTo($(this).get(0).originalParent);}
	}).tooltip({ hide: { effect: "explode", duration: 1000 } });
	var tabs = $("#Workspace").tabs();
	tabs.find(".ui-tabs-nav").sortable({
		axis: "x",
		stop: function() {
			tabs.tabs("refresh");
		}
	});
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
	
	//Click function for TabInput boxes
	$(".TabInput").click(function() {
		alert(TabInput[$(this).attr('id')][0]); //Test, remove once done
		//TODO: få fram pop-up av input property sheet där man kan definiera input
	});
	
	// Zoom functionality
	/*$("#Workspace").get(0).scale = 1;
	$("#Workspace>div").bind("mousewheel", function(event){
		var delta = event.originalEvent.wheelDelta;
		if(delta > 0)
			$("#Workspace").get(0).scale *= 1.1;
		else if(delta < 0)
			$("#Workspace").get(0).scale /= 1.1;
		$(this).css('transform', 'scale('+$("#Workspace").get(0).scale+')');
		event.preventDefault();
	});*/
	
	// Populate the sidebar with elements
	for(var v in Variables)
		$("<div>").html(Variables[v]).appendTo("#Elements-Variables").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Variables[v];
	for(var v in Functions)
		$("<div>").html(Functions[v][0]).appendTo("#Elements-Functions").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Functions[v];
	for(var v in Macros)
		$("<div>").html(Macros[v][0]).appendTo("#Elements-Macros").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Macros[v];
	for(var v in Templates)
		$("<div>").html(Templates[v][0]).appendTo("#Elements-Templates").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Templates[v];
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
